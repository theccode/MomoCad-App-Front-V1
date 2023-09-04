import { Component } from "react"
import Footer from "../Footer"
import { NavigationBar } from "../NavigationBar"
import { DataTypes } from "../data/Types";

export class OrderDetails extends Component{
    componentDidMount(){
        this.props.loadOrdersByUserId(DataTypes.ORDERSBYUSER)
    }
   render () {
    const { ordersbyuser } = this.props;
        return (
            <>
                <NavigationBar display="none" showOrderLink="none" { ...this.props }/>
                {
                    ordersbyuser && ordersbyuser.length > 0 ? ordersbyuser.map(order => {
                        return <div className="mt-4 ml-4 mr-4 border border-gray-700 rounded-lg shadow bg-gray-800 border-gray-700 m-auto p-2" key={ order.orderId }>
                            <div className="px-5 pb-5 mr-2 py-5">
                                <div className="flex items-center flex-col lg:flex-row md:flex-row justify-between mb-2">
                                    <span className="text-xl italic font-semibold tracking-tight text-gray-200 border-dashed p-2 rounded-lg dark:text-white" style={{ fontFamily: 'Roboto'}}>MomocadID: { order.momocadId  }</span>
                                    <h3 className="text-2xl italic mr-3  text-white">Amount charged: {order.amount}</h3>
                                </div>
                                    <hr className="border-gray-700 border-dashed sm:mx-auto border-gray-700 lg:my-1  mt-2 mb-2 md:mt-1 md:mb-1 lg:mt-1 lg:mb-1" /> 
                                <div className="flex items-center flex-col lg:flex-row md:flex-row justify-between">
                                    <h5 className="text-xl text-justify  tracking-tight text-gray-200 dark:text-white">SenderID: { order.senderId }</h5>
                                    <h5 className="text-xl text-justify  tracking-tight text-gray-200 dark:text-white">RecipientID: { order.recipientId }</h5>
                                    <h5 className="text-xl text-justify  tracking-tight text-gray-200 dark:text-white">Status: { !order.status ? 'Successful' : 'Failed'}</h5>
                                    <h5 className="text-xl text-justify  tracking-tight text-gray-200 dark:text-white">Reference: { order.transactionId }</h5>
                                    <h5 className="text-white m-2 ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{float: "right", backgroundColor: `${ order }`}}>Date: { order.createdAt.split('T')[0] },  Time: { order.createdAt.split('T')[1] }</h5>
                                </div>
                            </div>
                        </div>
                    })  : <h1 className="text-white text-xl text-center">No Recent Orders</h1>
                }
                <Footer />
            </>
        )
   }
    
}