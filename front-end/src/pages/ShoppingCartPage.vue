<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <CartList @remove-from-cart="removeFromCart($event)" :cartItems="cartItems" />
        <button class="checkout-button">Proceed to checkout</button>
    </div>
    <div v-else>
        You currently have no items in your cart
    </div>
</template>

<script>

import CartList from '@/components/CartList.vue';
import axios from 'axios';

export default {
    name: "ShoppingCartPage",
    props: ['user'],
    components: {
        CartList
    },
    data() {
        return {
            cartItems: [],
        }
    },
    methods: {
        async removeFromCart(productId) {
            const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart
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
        if (this.user) {
            const response = await axios.get(`/api/users/${this.user.uid}/cart`);
            const cartItems = response.data
            this.cartItems = cartItems
        }
    }
}

</script>