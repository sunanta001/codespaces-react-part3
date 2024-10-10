import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Item(props) {
    return (
        <div key={props.id} onClick={() => props.callback(props)}>
            <img src={props.img} alt={props.name} width={200} height={200} /><br />
            id: {props.id}<br />
            Name: {props.name}<br />
            Price:{props.price} Baht<br />
        </div>
    );
}
 
export default function Shop() {
    const [products, setProducts] = useState([]);
    const URL="https://fuzzy-spork-pjjq54rqrqqvh6966-5000.app.github.dev/"
    useEffect(() => {
        axios.get(URL+'/api/products')
        .then(response =>{
            setProducts(response.data);
        })
        .catch(error =>{
            console.log("error");
        })
    }, [])
    const [cart, setCart] = useState([]);
    function addCart(item) {
        // เช็คว่ามีสินค้านี้อยู่ในตะกร้าหรือไม่
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            // ถ้ามีให้เพิ่มจำนวนขึ้น
            setCart(cart.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            // ถ้าไม่มีให้เพิ่มสินค้าใหม่
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    }
 
    function removeFromCart(itemId) {
        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem.quantity > 1) {
            // ถ้ามีมากกว่าหนึ่งให้ลดจำนวน
            setCart(cart.map(cartItem =>
                cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            ));
        } else {
            // ถ้ามีแค่หนึ่งให้ลบออกจากตะกร้า
            setCart(cart.filter(item => item.id !== itemId));
        }
    }
 
    function clearCart() {
        setCart([]);
    }
 
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const productList = products.map(item => (
        <Item {...item} callback={addCart} key={item.id} />
    ));
 
    const cartList = cart.map(item => (
        <li key={item.id}>
            {item.name} (x{item.quantity}) {item.price} Baht
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </li>
    ));
 
    return (
        <>
            <div className='grid-container'>{productList}</div>
            <h1>Cart</h1>
            <ol>{cartList}</ol>
            <h2>Total Price: {totalPrice} Baht</h2>
            <button onClick={clearCart}>Clear All</button>
        </>
    );
}