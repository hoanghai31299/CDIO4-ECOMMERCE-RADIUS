import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

import Aux from "../../hoc/_Aux";

class BootstrapTable extends React.Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Basic Table</Card.Title>
                <span className="d-block m-t-5">
                  use bootstrap <code>Table</code> component
                </span>
              </Card.Header>
              <Card.Body>
                <Table responsive variant="dark" hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>
                        <img
                          src="data:image/png;base64,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"
                          alt="anh cho vio"
                          width="30px"
                          height="30px"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Hover Table</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Striped Table</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>striped</code> with <code>Table</code>{" "}
                  component
                </span>
              </Card.Header>
              <Card.Body>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default BootstrapTable;
