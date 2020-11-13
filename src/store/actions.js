import {
    reject,
    resolve
} from 'core-js/fn/promise'
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1.判断商品是否存在
            // let oldProduct = null
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct)
                // oldProduct.count += 1
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}