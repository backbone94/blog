import { Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";

const Major = () => {
  const { Content } = Layout;

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default Major;
