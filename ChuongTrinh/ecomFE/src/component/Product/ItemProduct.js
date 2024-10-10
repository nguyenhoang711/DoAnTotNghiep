import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemCartStart } from '../../action/ShopCartAction';
import CommonUtils from '../../utils/CommonUtils';
import './ItemProduct.scss';
// độ phân giải ảnh có thể làm vỡ layout
function ItemProduct(props) {


    return (
        <div className={props.type}>
            <div style={{ cursor: 'pointer' }} className="single-product ml-2">
                <Link to={`/detail-product/${props.id}`}>
                    <div style={{  height: props.height , }} className="product-img overflow-hidden">
                        <img className="img-fluid w-100" src={props.img} alt="" />
                        <div className="p_icon w-100">
                            <a >
                                <i className="ti-eye" />
                            </a>
                            <a >
                                <i className="ti-shopping-cart" />
                            </a>
                        </div>
                    </div>
                    <div style={{  height: '99px' }} className="product-btm">
                        <a className="d-block">
                            <h4 >{props.name}</h4>
                        </a>
                        <div className="mt-3">
                            <span className="mr-4">{CommonUtils.formatter.format(props.discountPrice)}</span>
                            <del>{CommonUtils.formatter.format(props.price)}</del>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default ItemProduct;