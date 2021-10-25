import { getPurchases, getVeggies } from "./database.js"
import { getEntrees } from "./database.js"
import { getSides } from "./database.js"

const buildOrderListItem = (order) => {
    const veggies = getVeggies()
    const sides = getSides()
    const entrees = getEntrees()

    const veggiePrice = veggies.find(
        (veggie) => {
            return veggie.id === order.veggieId
        }
    )
    const entreePrice = entrees.find(
        (entree) => {
            return entree.id === order.entreeId
        }
    )

    const sidePrice = sides.find(
        (side) => {
            return side.id === order.sideId
        }
    )
    
    const total = veggiePrice.price + entreePrice.price + sidePrice.price
    const costString = total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
    
    return `<li>
        Receipt #${order.id} = ${costString} 
    </li>`
    
    }
//     return `<li>
//         Receipt #${order.id} = ${total.toLocaleString("en-US", {
//             style: "currency",
//             currency: "USD"
//         })}
//     </li>`
// }

export const Sales = () => {
    const sales = getPurchases()
   
    let html = "<ul>"

    const listItems = sales.map(buildOrderListItem)


    
    html += listItems.join("")
    html += "</ul>"

    return html




    // return `
    //     <ul>
    //         ${sales.map(
    //             (sale) => {
    //                 // Reflect: What is the scope of this `return` keyword?
    //                 return buildOrderListItem(sale)
    //             }
    //         ).join("")}
    //     </ul>
    // `

}

