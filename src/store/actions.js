import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {
        // 1.判断商品是否存在
        // let oldProduct = null
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 2.判断oidProduct
        if (oldProduct) {
            context.commit(ADD_COUNTER, oldProduct)
            // oldProduct.count += 1
        } else {
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
    }
}