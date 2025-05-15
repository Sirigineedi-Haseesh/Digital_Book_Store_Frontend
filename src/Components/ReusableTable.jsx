import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ReusableTable = ({ columns, data, actions }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{col.render ? col.render(item) : item[col.key]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant={action.variant || 'primary'}
                      className="me-2"
                      onClick={() => action.onClick(item)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ReusableTable;