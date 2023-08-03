import { createContext, useContext, useState, ReactNode } from "react";


type Order = {
    imageUrl: string,
    count: number,
    title: string,
    prize: number
    restaurantName: string | undefined,
}

export interface OrderContextModel {

    addOrder: (data: Order) => void,
    increaseAmout: (title: string, count: number) => void,
    removeFromOrder: (name: string) => void,
    order: Order[],
    showOrder: boolean,
    setShowOrder: React.Dispatch<React.SetStateAction<boolean>>,

    // user: User | null
    // loginUser: (email: string, password: string) => Promise<UserCredential>
    // createUser: (email: string, password: string) => Promise<UserCredential>
    // signOutUser: () => Promise<void>
    // singUpWithGoogle: () => Promise<UserCredential>;
}

type OrderContextProviderProps = {
    children: ReactNode
}


const OrderContext = createContext<OrderContextModel>({} as OrderContextModel);

export const OrderContextProvider = ({ children }: OrderContextProviderProps) => {

    const [order, setOrder] = useState<Order[]>([]);
    const [showOrder, setShowOrder] = useState(false);

    const addOrder = (data: Order) => {
        setOrder(orders => [...orders, data])
    }

    const increaseAmout = (title: string, icreaseCount: number) => {
        setOrder(prevState => {
            const newState = prevState.map(obj => {
                if (obj.title === title) {
                    const newCount = obj.count + icreaseCount;
                    return { ...obj, count: newCount }
                }

                return obj;
            })
            return newState;
        })
    }

    const removeFromOrder = (name: string) => {
        setOrder(prevState => prevState.filter(x => x.title != name))
    }

    return (
        <OrderContext.Provider value={{ addOrder, order, increaseAmout, removeFromOrder, showOrder, setShowOrder }}>
            {children}
        </OrderContext.Provider>
    )

}

export const Order = () => {
    return useContext(OrderContext);
}