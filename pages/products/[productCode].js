import { useRouter } from "next/router";

export default function Product({product}){
    return (
        <div>
            <h1>Name: {product.name}</h1>
            <p>Price: {product.price}$</p>
            <p>Quantity: {product.quantity}</p>
            <p>UniqueCode: {product.uniqueCode}</p>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:4444/api/items/').then(r=>r.json())
    const items = res.data.data;
  
    const paths = items.map((item) => ({
      params: { productCode: item.uniqueCode.toString() },
    }))
  
    return { paths, fallback: false }
  }
  
  
  export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:4444/api/items/${params.productCode}`).then(r=>r.json())
    const product = res.item.data.shift();
    return { props: { product } }
  }