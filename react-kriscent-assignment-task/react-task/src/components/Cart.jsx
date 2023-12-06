import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleRemoveProduct = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    }
    const handleCheckout = () => {
        if (cart.length === 0) return alert("Your cart is empty");
        if (!isLogin) return alert("Please login to checkout");
        dispatch({ type: 'CHECKOUT' })
        alert("Your Order will deliver shortly!")
        onClose();
    }
    return (
        <>
            <a onClick={() => onOpen()} className="text-white">Cart</a>
            <Modal
                size={"md"}
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior='inside'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-2'>
                                    {cart.length === 0 && (
                                        <div className="product-item border p-3 rounded-xl">
                                            <h3 className="product-name">Your cart is empty</h3>
                                        </div>
                                    )}
                                    {cart.map((product) => (
                                        <div key={product.id} className="product-item border p-3 rounded-xl">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-description">{product.description}</p>
                                            <div className="product-details flex gap-2">
                                                <p className="product-price">Price: {product.price}</p>
                                                <p className="product-discount">Discount: {product.discount}</p>
                                            </div>
                                            <Button color="danger" onPress={() => handleRemoveProduct(product)}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleCheckout}>
                                    Checkout
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default Cart