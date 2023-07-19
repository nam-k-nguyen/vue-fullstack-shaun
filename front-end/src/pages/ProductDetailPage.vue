<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="'../' + product.imageUrl">
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>

            <button v-if="!itemIsInCart && user" @click="addToCart" class="add-to-cart">Add to cart</button>
            <button v-if="itemIsInCart && user" disabled class="grey-button">Already in cart</button>
            <button v-if="!user" @click="signIn" class="sign-in">Sign in to add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>

import NotFoundPage from './NotFoundPage.vue';
import axios from 'axios';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

export default {
    name: "ProductDetailPage",
    props: ["user"],
    data() {
        return {
            product: {},
            cartItems: []
        }
    },
    components: {
        NotFoundPage,
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${this.user.uid}/cart`, {
                id: this.$route.params.productId
            })
            alert('Successfully added item to cart')
        },
        async signIn() {
            const email = prompt('Please enter your email to sign in');
            const auth = getAuth();
            const actionCodeSettings = {
                url: `https://vue-fullstack-shaun.onrender.com/products/${this.$route.params.productId}`,
                handleCodeInApp: true,
            }
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('A login link was sent to the email you provided');
            window.localStorage.setItem('emailForSignIn', email);
        }
    },
    computed: {
        itemIsInCart() {
            const found = this.cartItems.find(item => item.id == this.$route.params.productId)
            return found ? true : false
        }
    },
    watch: {
        async user(newUserValue) {
            if (newUserValue) {
                const response2 = await axios.get(`/api/users/${this.user.uid}/cart`)
                const cartItems = response2.data
                this.cartItems = cartItems
            }
        }
    },
    async created() {
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            const email = window.localStorage.getItem('emailForSignIn');
            await signInWithEmailLink(auth, email, window.location.href);
            alert('Successfully signed in!');
            window.localStorage.removeItem('emailForSignIn')
        }

        const response1 = await axios.get(`/api/products/${this.$route.params.productId}`)
        const product = response1.data
        this.product = product

        if (this.user) {
            const response2 = await axios.get(`/api/users/${this.user.uid}/cart`)
            const cartItems = response2.data
            this.cartItems = cartItems
        }
    }
}

</script>