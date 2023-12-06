import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MyOrders = () => {
    const orders = useSelector((state) => state.orders);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <a onClick={() => onOpen()} className="text-white">My Orders</a>
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
                                    {orders.length === 0 && (
                                        <div className="product-item border p-3 rounded-xl">
                                            <h3 className="product-name">Your Orders is empty</h3>
                                        </div>
                                    )}
                                    {orders.map((product) => (
                                        <div key={product.id} className="product-item border p-3 rounded-xl">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-description">{product.description}</p>
                                            <div className="product-details flex gap-2">
                                                <p className="product-price">Price: {product.price}</p>
                                                <p className="product-discount">Discount: {product.discount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default MyOrders;