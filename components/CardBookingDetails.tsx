import { Calendar, MapPin, Mail, Phone, User, Ticket, CheckCircle, CloudUpload } from "lucide-react";
import { Card, Col, Row, Avatar, Typography, Divider, Rate, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const CardBookingDetails = () => {
  return (
    <Card bordered={false} style={{ backgroundColor: '#fff', padding: '24px' }}>
      {/* Booking Info */}
      <Card bordered style={{ marginBottom: '24px', backgroundColor: '#f9fafb' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <Title level={4} style={{ marginBottom: 0 }}>Booking ID</Title>
              </Col>
              <Col>
                <Text>:</Text>
              </Col>
              <Col>
                <Text code>331c51ea-0e10-49b5-8330-24d581bac493</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type="link" style={{ color: '#fa8c16' }}>
              Pending
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '4px'}}>
          <Col>
            <Title level={5}>Request At</Title>
          </Col>
          <Col>
            <Text>:</Text>
          </Col>
          <Col>
            <Text>Saturday, 10 September 2024</Text>
          </Col>
        </Row>
      </Card>

      {/* Client Info */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Client</Title>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar size={130} src="/images/4.png" />
          </Col>
          <Col>
            <Title level={5}>Kim Da Mi</Title>

            <Row align="middle" gutter={8}>
              <Col>
                <Mail style={{ width: '1rem', height: '1rem' }} />
              </Col>
              <Col>
                <Text type="secondary">damikim@gmaail.com</Text>
              </Col>
            </Row>

            <Row align="middle" gutter={8} style={{ marginTop: '8px' }}>
              <Col>
                <User style={{ width: '1rem', height: '1rem' }} />
              </Col>
              <Col>
                <Text type="secondary">Female</Text>
              </Col>
            </Row>

            <Row align="middle" gutter={8} style={{ marginTop: '8px' }}>
              <Col>
                <MapPin style={{ width: '1rem', height: '1rem' }} />
              </Col>
              <Col>
                <Text type="secondary">Jalan Sisingamangaraja No. 19C, Semarang, Jawa Tengah</Text>
              </Col>
            </Row>

            <Row align="middle" gutter={8} style={{ marginTop: '8px' }}>
              <Col>
                <Phone style={{ width: '1rem', height: '1rem' }} />
              </Col>
              <Col>
                <Text type="secondary">+62 123456789</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Services Info */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Services</Title>
        <Title level={5}>Business Meeting Translation</Title>
        <Row justify="space-between">
          <Col>
            <Text>English to Indonesia</Text>
          </Col>
          <Col>
            <Text style={{ color: '#1890ff' }}>Rp50.000/hr</Text>
          </Col>
        </Row>
      </Card>

      {/* Date, Time & Location */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Date and Time</Title>

        <Row align="middle" gutter={8} style={{ marginBottom: '8px' }}>
          <Col>
            <Calendar style={{ width: '1.2rem', height: '1.2rem' }} />
          </Col>
          <Col>
            <Text>Saturday, 11 September 2024</Text>
          </Col>
        </Row>

        <Row align="middle" gutter={8}>
          <Col>
            <Calendar style={{ width: '1.2rem', height: '1.2rem' }} />
          </Col>
          <Col>
            <Text>10:00 - 12:00</Text>
          </Col>
        </Row>


        <Title level={4} style={{marginTop: '8px'}}>Location</Title>
        <Row align="middle" gutter={8}>
          <Col>
            <MapPin style={{ width: '1.2rem', height: '1.2rem' }} />
          </Col>
          <Col>
            <Text>Jl. Merdeka Raya No. 45, Kelurahan Cempaka Putih, Jakarta Pusat</Text>
          </Col>
        </Row>
      </Card>

 {/* Notes */}
 <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Notes</Title>
        <Row align="middle" gutter={8}>
          <Col>
            <CheckCircle style={{ width: '1.2rem', height: '1.2rem', color: '#52c41a' }} />
          </Col>
          <Col>
            <Text>
              Please ensure that the translation meets the specific needs outlined in the request.
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Proof */}
      <Card bordered style={{ marginBottom: '24px' }}>
      <Title level={4}>Proof</Title>
     
     <Card
     className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center w-full flex justify-center">
      <Upload
        customRequest={(file) => {
          try {
            console.log(file);
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }}
        showUploadList={false}
        style={{ width: '100%' }}
      >
        <div className="cursor-pointer w-full flex flex-col items-center">
          <CloudUpload className="text-blue-400 text-5xl mb-2" />
          <Text className="text-gray-600 hover:underline">Drag drop or click to upload</Text>
        </div>
      </Upload>
      </Card>
      
    </Card>

      {/* Review Section */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Review</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Rate disabled defaultValue={5} />
          </Col>
          <Col>
            <Text type="secondary">24 Oktober 2024</Text>
          </Col>
        </Row>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, non sequi! Hic eos, quo laborum architecto amet similique fugit suscipit eligendi quidem!
        </Paragraph>
      </Card>

      {/* Coupon Section */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Coupon</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <div style={{ backgroundColor: '#1890ff', color: '#fff', padding: '12px', borderRadius: '50%' }}>
                  <Ticket />
                </div>
              </Col>
              <Col>
                <Title level={5}>12% Off</Title>
                <Text type="secondary">Exclusive Summer Sale</Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Text style={{ color: '#ff4d4f' }}>Exp: 27 Sept 2024</Text>
          </Col>
        </Row>
      </Card>

      {/* Pricing Section */}
      <Card bordered style={{ marginBottom: '24px' }}>
        <Title level={4}>Pricing</Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Service Price per hour</Text>
          </Col>
          <Col>
            <Text>Rp100.000</Text>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <Text>Duration</Text>
          </Col>
          <Col>
            <Text>3 hours</Text>
          </Col>
        </Row>
        <Divider />
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong>Total Service Fee</Text>
          </Col>
          <Col>
            <Text strong style={{ color: '#1890ff' }}>Rp210.000</Text>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default CardBookingDetails;
