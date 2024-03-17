// Import your SVG files
import YourOrders from './Your_Orders.svg';
import PaymentsOptions from './payments.svg';
import YourAddress from './loaction.svg';
import LoginAndSecurity from './login_security.svg';
import ContactUs from './contact_us.svg';

// Create an array of objects
const menuItems = [
    {
        name: "Your Orders",
        ImgUrl: YourOrders
    },
    {
        name: "Payments Options",
        ImgUrl: PaymentsOptions
    },
    {
        name: "Your Address",
        ImgUrl: YourAddress
    },
    {
        name: "Login And Security",
        ImgUrl: LoginAndSecurity
    },
    {
        name: "Contact Us",
        ImgUrl: ContactUs
    }
];

// Export the array of objects
export default menuItems;
