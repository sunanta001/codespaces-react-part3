import './Shop.css';
import { useState } from 'react';

function Item(props) {
    return (
        <div key={props.id} className="item">
            <img src={props.img} alt={props.name} width={200} height={200} /><br />
            <strong>ID:</strong> {props.id}<br />
            <strong>Name:</strong> {props.name}<br />
            <strong>Price:</strong> {props.price} Baht<br />
            <button onClick={() => props.callback(props)}>Add to Cart</button>
        </div>
    );
}

export default function Shop() {
    const products = [
        { id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg" },
        { id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg" },
        { id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg" },
        { id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg" },
        { id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg" },
        { id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg" }
    ];
    
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
            <button onClick={clearCart}>Clear Cart</button>
        </>
    );
}

