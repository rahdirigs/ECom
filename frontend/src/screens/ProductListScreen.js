import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import { listProducts, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConsts';

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success,
        product: createdProduct,
    } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo.isAdmin) {
            history.push('/login');
        }

        if (success) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, userInfo, history, createdProduct, success]);

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button
                        className='my-2'
                        variant='primary'
                        onClick={createProductHandler}
                    >
                        <i className='fas fa-plus mx-2'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {errorCreate && (
                <AlertMessage variant='danger'>{errorCreate}</AlertMessage>
            )}
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant='danger'>{error}</AlertMessage>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>₹. {product.curPrice}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            variant='primary'
                                            className='btn-sm'
                                            type='submit'
                                        >
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductListScreen;
