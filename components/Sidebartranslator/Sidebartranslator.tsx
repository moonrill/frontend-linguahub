import { useState, createContext, useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { UserOutlined, CreditCardOutlined, CalendarOutlined, FileOutlined, DollarOutlined } from "@ant-design/icons";

const { Sider } = Layout;

// Sidebar context untuk mengelola state expand/collapse
const SidebarContext = createContext<{ expanded: boolean; toggleSidebar: () => void }>({ expanded: true, toggleSidebar: () => {} });

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default function Sidebartranslator() {
  const { expanded, toggleSidebar } = useContext(SidebarContext);

  return (
    <Sider collapsible collapsed={!expanded} onCollapse={toggleSidebar} theme="dark">
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>My Profile</Menu.Item>
        <Menu.Item key="2" icon={<CreditCardOutlined />}>My Coupon</Menu.Item>
        <Menu.Item key="3" icon={<CalendarOutlined />}>Service Request</Menu.Item>
        <Menu.Item key="4" icon={<FileOutlined />}>Bookings</Menu.Item>
        <Menu.Item key="5" icon={<DollarOutlined />}>Payments</Menu.Item>
      </Menu>
    </Sider>
  );
}
