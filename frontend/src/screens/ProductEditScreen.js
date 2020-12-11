import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConsts';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [curPrice, setCurPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [usedFor, setUsedFor] = useState(0);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success,
    } = productUpdate;

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/product-list');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setDescription(product.description);
                setCountInStock(product.countInStock);
                setUsedFor(product.usedFor);
                setCurPrice(
                    Math.max(
                        product.price - product.price * 0.05 * product.usedFor,
                        product.price * 0.2
                    )
                );
            }
        }
    }, [dispatch, product, productId, history, success]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                curPrice,
                image,
                brand,
                category,
                description,
                countInStock,
                usedFor,
            })
        );
    };

    return (
        <>
            <Link to='/admin/product-list' className='btn btn-primary my-2'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <AlertMessage variant='danger'>{errorUpdate}</AlertMessage>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <AlertMessage variant='danger'>{error}</AlertMessage>
                ) : (
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label> New Condition Price</Form.Label>
                            <Form.Control
                                type='number'
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                value={image}
                                placeholder='Enter Image URL'
                                required
                                onChange={(e) => setImage(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose a Product Image'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                value={brand}
                                required
                                onChange={(e) => setBrand(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                value={category}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count in Stock</Form.Label>
                            <Form.Control
                                type='number'
                                value={countInStock}
                                required
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='usedFor'>
                            <Form.Label>Used for</Form.Label>
                            <Form.Control
                                type='number'
                                value={usedFor}
                                required
                                onChange={(e) => setUsedFor(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                            months
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
