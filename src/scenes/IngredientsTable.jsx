import React from 'react'
import MaterialTable from 'material-table';

export default function IngredientsTable({ ingredients, dishId }) {
  console.log('INGREDIENTS TABLE: ', ingredients)

  const [state, setState] = React.useState({
    columns: [
      { title: 'Ingredient name', field: 'name' },
      { title: 'Margin', field: 'margin' },
      { title: 'Part', field: 'part', type: 'numeric' },
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      // },
    ],
    data: ingredients,
  });

  return (
    <div style={{width: '100%'}}>
      <MaterialTable
        options={{
          search: false,
          toolbar: false
        }}
        columns={state.columns}
        data={state.data}
      />
    </div>
  )
}
