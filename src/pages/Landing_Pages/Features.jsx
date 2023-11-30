import {
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import Menu from "../../components/Menu";
import BoxFeatures from "../../components/BoxFeatures"
import Filter from "../../assets/filter.png"
import Inventory from "../../assets/catatan.png"
import Management from "../../assets/manajemen.png"
import Stock from "../../assets/stok.png"
import Location from "../../assets/lokasi.png"
const Features = () => {
    return (
        <>
            <Menu />
            <Heading textAlign={"center"} color={"gray.500"} fontSize={20} mb={20}>Features</Heading>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" mx={40}>
                <BoxFeatures
                    image={Filter}
                    title="Search and Filtering"
                    description="Feature to search and filter what users need"
                />
                <BoxFeatures
                    image={Inventory}
                    title="Inventory Recording"
                    description="contains inventory records that are always updated"
                />
                <BoxFeatures
                    image={Stock}
                    title="Stock Monitoring"
                    description="features for managing incoming and outgoing stock"
                />
                <BoxFeatures
                    image={Management}
                    title="Supplier Management"
                    description="features for managing incoming stock from suppliers"
                />
                <BoxFeatures
                    image={Location}
                    title="Warehouse Location Management"
                    description="feature for managing locations of partnered warehouses"
                />
            </SimpleGrid>
        </>
    )
}


export default Features;