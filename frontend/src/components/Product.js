import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { product } = props;

    const getPrice = (price) => {
        var x = price;
        x = x.toString();
        var end = x.substring(x.length - 3);
        var start = x.substring(0, x.length - 3);
        if (start !== ' ') end = ',' + end;
        var ret = start.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + end;
        return ret;
    };

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
                </Card.Text>

                <Card.Text as='h4'>₹. {getPrice(product.price)}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
