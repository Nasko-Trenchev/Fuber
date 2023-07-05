import { StyledEngineProvider, Button } from '@mui/material';
import { Order } from '../../contexts/OrderContext';

import styles from './ShoppingCart.module.css';

export default function ShoppingCart() {

    const { order, removeFromOrder } = Order();

    const total = order.reduce((acc, curr) =>
        acc + (curr.prize * curr.count), 0
    )

    return (
        <StyledEngineProvider injectFirst>
            {order.length > 0 &&
                <div className={styles["shoppingCart"]}>
                    {order.map(x => (
                        <div key={x.imageUrl} className={styles["shoppingCartDetails"]}>
                            <img src={x.imageUrl} alt="" />
                            <p>{x.count}x {x.title}</p>
                            <p>{x.count * x.prize} лв</p>
                            <Button onClick={() => removeFromOrder(x.title)} sx={{ color: 'red', ":hover": {backgroundColor: 'whitesmoke'} }}>X</Button>
                        </div>
                    ))}
                    <div className={styles["shoppingCartChekout"]}>
                        <p>Total: {total} лв</p>
                        <Button variant="contained">Proceed to checkout</Button>
                    </div>
                </div>
            }
        </StyledEngineProvider>
    )
}