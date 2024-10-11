import { Layout, Button } from 'antd'; 
import { ArrowUpOutlined } from '@ant-design/icons'; 
import Image from "next/image";

const { Header } = Layout;

const Navbar = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Header className="flex justify-between items-center px-10 py-5 shadow-md bg-white fixed w-full z-50">
            <a href="#">
                <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
            </a>
            
            <div className="space-x-8 hidden md:flex items-center">
                <a href="#" className="text-blue-500 hover:text-blue-700">Home</a>
                <a href="#" className="text-blue-500 hover:text-blue-700">Event</a>
                <a href="#" className="text-blue-500 hover:text-blue-700">Translator</a>
                <Button type="primary" className="text-blue-500 bg-blue-100 hover:bg-blue-200">Join as Translator</Button>
                <Button type="default" className="bg-blue-600 text-white hover:bg-blue-700">Sign in</Button>
            </div>
            
            {/* scrol top */}
            <Button 
                className="fixed bottom-4 right-4 shadow-lg" 
                onClick={scrollToTop} 
                icon={<ArrowUpOutlined />} 
                type="primary"
                shape="circle"
            />
        </Header>
    );
}

export default Navbar;
