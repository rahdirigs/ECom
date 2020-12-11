import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { product } = props;

    return (
        <Card className='my-2 p-2 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating
                        rating={product.rating}
                        reviews={product.numReviews}
                    />
                    {product.usedFor === 0 ? (
                        <span>
                            <strong>Unused Product</strong>
                        </span>
                    ) : (
                        <span>
                            <strong>Used For:</strong> {product.usedFor} months
                        </span>
                    )}
                </Card.Text>

                <Card.Text as='h4'>₹. {product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
