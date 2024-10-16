import Brand from "./pages/Admin/Entity/Brand";
import Product from "./pages/Admin/Entity/Product";
import Table from "./pages/Admin/Table";
import Color from "./pages/Admin/Entity/Color";
import Genres from "./pages/Admin/Entity/Genre";
import ProductTable from './pages/Admin/ProductTable';
import Size from './pages/Admin/Entity/Size';
import Fee from './pages/Admin/Entity/Fee';
export default [
    {
        display_name: 'Fraix de gestion',
        route: 'fees',
        element: <Table
            fields={
                [
                    { display_name: 'Id', field: 'id' },
                    { display_name: 'Fee', field: 'fee' }

                ]
            } name="fees" create={<Fee />} />
    },
    {
        display_name: 'Color',
        route: 'colors',
        element: <Table
            fields={
                [
                    { display_name: 'Id', field: 'id' },
                    { display_name: 'Nom', field: 'colorName' }

                ]
            } name="colors" create={<Color />} />
    },
    {
        display_name: 'Size',
        route: 'sizes',
        element: <Table
            fields={
                [
                    { display_name: 'Id', field: 'id' },
                    { display_name: 'Taille', field: 'size' }

                ]
            } name="sizes" create={<Size />} />
    },
    {
        display_name: 'Genre',
        route: 'genres',
        element: <Table fields={[
            { display_name: 'Id', field: 'id' },
            { display_name: 'Nom', field: 'name' }
        ]} name="genres" create={<Genres />} />
    },
    {
        display_name: 'Brand',
        route: 'brands',
        element: <Table fields={[
            { display_name: 'Id', field: 'id' },
            { display_name: 'Nom de marque', field: 'brand_name' },
            { display_name: 'Chemin du logo', field: 'logo_path' },
        ]} name="brands" create={<Brand />} />
    },
    {
        display_name: 'Product',
        route: 'products',
        element: <ProductTable
            fields={[
                { display_name: 'Id', field: 'id' },
                { display_name: 'En Stock', field: 'available', custom: <test /> },
                { display_name: 'Prix', field: 'price' },
                { display_name: 'Nom', field: 'name' },
                { display_name: 'Description', field: 'description' },
                { display_name: 'Popularity', field: 'popularity' },
                { display_name: 'Poids', field: 'weight' },
                // { display_name: 'Marque', field: 'brand' },
                { display_name: 'Genre', field: 'genre' },
                { display_name: 'Solde', field: 'clearance' }


            ]}
            name="products"
            create={<Product />} />,
    }

]

const test = () => {
    return (
        <p>hello</p>
    )
} 