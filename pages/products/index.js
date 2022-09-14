import Link from 'next/link';

export default function Items({ data }){
    return (
        <div>
            <h1>Items</h1>
            <ul>
                {data.map(i => {
                    return (
                        <li key={i.uniqueCode}>
                            <Link href={`products/${i.uniqueCode}`}>
                                <a>{i.name} {i.price}$</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export async function getStaticProps(){
    const is = await fetch('http://localhost:4444/api/items').then(r=>r.json());
    const data = is.data.data;
    return {
        props: {
            data
        }
    }
}