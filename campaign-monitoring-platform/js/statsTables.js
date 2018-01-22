YUI().use(
  'aui-datatable',
  'aui-datatype',
  'datatable-sort',
  function(Y) {
    var remoteData = [
      {Target_Location: 'San Francisco', colors:['red'], fruit:['banana','cherry'], Last_Updated: '4/19/2007'},
      {Target_Location: 'Los Angeles', colors:['green'], fruit:['cherry'], Last_Updated:['4/10/2007']},
      {Target_Location: 'San Francisco', colors:['red'], fruit:['cherry'], Last_Updated: '4/19/2007'},
    ];

    var nameEditor = new Y.TextAreaCellEditor(
      {
        validator: {
          rules: {
            name: {
              email: true,
              required: true
            }
          }
        }
      }
    );

    var fruitEditor = new Y.DropDownCellEditor(
      {
        editable: true,
        multiple: true,
        options: {
          apple: 'Apple',
          banana: 'Banana',
          cherry: 'Cherry',
          kiwi: 'Kiwi'
        },
        validator: {
          rules: {
            value: {
              required: true
            }
          }
        }
      }
    );

    var nestedCols = [

  {
        editor: new Y.DateCellEditor(
          {
            calendar: {
              selectionMode: 'multiple',
              showNextMonth: false,
              showPrevMonth: false,
              width: '250px'
            },
            dateFormat: '%m/%d/%Y',
            validator: {
              rules: {
                value: {
                  required: true
                }
              }
            }
          }
        ),
        key: 'Last_Updated',
        sortable: true
      },


      {
        editor: nameEditor,
        key: 'Item_Name',
        sortable: true
      },

      // {
      //   editor: new Y.RadioCellEditor(
      //     {
      //       editable: true,
      //       options: {
      //         yes: 'Yes',
      //         no: 'No',
      //         maybe: 'Maybe'
      //       }
      //     }
      //   ),
      //   key: 'active'
      // },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Status',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Priority',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Started',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Ended',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Target_Location',
        sortable: true
      },

      // {
      //   editor: new Y.DropDownCellEditor(
      //     {
      //       editable: true,
      //       options: states
      //     }
      //   ),
      //   key: 'state'
      // },

   

      // {
      //   editor: new Y.CheckboxCellEditor(
      //     {
      //       editable: true,
      //       multiple: true,
      //       options: {
      //         red: 'Red',
      //         green: 'Green',
      //         blue: 'Blue'
      //       }
      //     }
      //   ),
      //   key: 'colors'
      // },

    
   {
        editor: new Y.TextCellEditor(
          {
            inputFormatter: Y.DataType.String.evaluate,
            validator: {
              rules: {
                value: {
                  number: true,
                  required: true
                }
              }
            }
          }
        ),
        key: 'Realtime_Stats',
        sortable: true
      },

      // {
      //   editor: fruitEditor,
      //   key: 'fruit',
      //   sortable: true
      // }
    
    ];



    var dataTable = new Y.DataTable(
      {
        columns: nestedCols,
        data: remoteData,
        editEvent: 'dblclick',
        plugins: [
          {
            cfg: {
              highlightRange: false
            },
            fn: Y.Plugin.DataTableHighlight
          }
        ]
      }
    ).render('#statsDataTable');

    dataTable.get('boundingBox').unselectable();
  }
);


YUI().use(
  'aui-datatable',
  'aui-datatype',
  'datatable-sort',
  function(Y) {
    var remoteData = [
      {Status: 'active', Priority: 'low', Date_Started: '05/04/2016', Date_Ended: '06/2016', Realtime_Stats: 5, Target_Location: 'San Francisco', colors:['red'], fruit:['banana','cherry'], Last_Updated: '4/19/2007', Item_Name: 'Campaign 1', state: 'CA'},
      {Status: 'inactive', Priority: 'high', Date_Started: '05/11/2016', Date_Ended: '07/2016', Realtime_Stats: 0, Target_Location: 'Los Angeles', colors:['green'], fruit:['cherry'], Last_Updated:['4/10/2007'], Item_Name: 'Campaign 2', state: 'CA'},
      {Status: 'active', Priority: 'medium', Date_Started: '05/12/2016', Date_Ended: '07/2016', Realtime_Stats: 5, Target_Location: 'San Francisco', colors:['red'], fruit:['cherry'], Last_Updated: '4/19/2007', Item_Name: 'Campaign 3', state: 'CA'},
      {Status: 'ongoing', Priority: 'high', Date_Started: '05/14/2016', Date_Ended: '05/14/2016', Realtime_Stats: 3, Target_Location: 'New York', colors:['red','blue'], fruit:['apple','cherry'], Last_Updated: '2/15/2006', Item_Name: 'Campaign 4', state: 'NY'},
    ];

    var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    var nameEditor = new Y.TextAreaCellEditor(
      {
        validator: {
          rules: {
            name: {
              email: true,
              required: true
            }
          }
        }
      }
    );

    var fruitEditor = new Y.DropDownCellEditor(
      {
        editable: true,
        multiple: true,
        options: {
          apple: 'Apple',
          banana: 'Banana',
          cherry: 'Cherry',
          kiwi: 'Kiwi'
        },
        validator: {
          rules: {
            value: {
              required: true
            }
          }
        }
      }
    );

    var nestedCols = [


      {
        editor: new Y.DateCellEditor(
          {
            calendar: {
              selectionMode: 'multiple',
              showNextMonth: false,
              showPrevMonth: false,
              width: '250px'
            },
            dateFormat: '%m/%d/%Y',
            validator: {
              rules: {
                value: {
                  required: true
                }
              }
            }
          }
        ),
        key: 'Last_Updated',
        sortable: true
      },


      {
        editor: nameEditor,
        key: 'Item_Name',
        sortable: true
      },

      // {
      //   editor: new Y.RadioCellEditor(
      //     {
      //       editable: true,
      //       options: {
      //         yes: 'Yes',
      //         no: 'No',
      //         maybe: 'Maybe'
      //       }
      //     }
      //   ),
      //   key: 'active'
      // },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Status',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Priority',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Started',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Ended',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Target_Location',
        sortable: true
      },

      // {
      //   editor: new Y.DropDownCellEditor(
      //     {
      //       editable: true,
      //       options: states
      //     }
      //   ),
      //   key: 'state'
      // },

   

      // {
      //   editor: new Y.CheckboxCellEditor(
      //     {
      //       editable: true,
      //       multiple: true,
      //       options: {
      //         red: 'Red',
      //         green: 'Green',
      //         blue: 'Blue'
      //       }
      //     }
      //   ),
      //   key: 'colors'
      // },

   {
        editor: new Y.TextCellEditor(
          {
            inputFormatter: Y.DataType.String.evaluate,
            validator: {
              rules: {
                value: {
                  number: true,
                  required: true
                }
              }
            }
          }
        ),
        key: 'Realtime_Stats',
        sortable: true
      },

      // {
      //   editor: fruitEditor,
      //   key: 'fruit',
      //   sortable: true
      // }
    
    ];



    var dataTable = new Y.DataTable(
      {
        columns: nestedCols,
        data: remoteData,
        editEvent: 'dblclick',
        plugins: [
          {
            cfg: {
              highlightRange: false
            },
            fn: Y.Plugin.DataTableHighlight
          }
        ]
      }
    ).render('#statsDataTable2');

    dataTable.get('boundingBox').unselectable();
  }
);

YUI().use(
  'aui-datatable',
  'aui-datatype',
  'datatable-sort',
  function(Y) {
    var remoteData = [
      {Status: 'active', Priority: 'low', Date_Started: '05/04/2016', Date_Ended: '06/2016', Realtime_Stats: 5, Target_Location: 'San Francisco', colors:['red'], fruit:['banana','cherry'], Last_Updated: '4/19/2007', Item_Name: 'Campaign 1', state: 'CA'},
      {Status: 'inactive', Priority: 'high', Date_Started: '05/11/2016', Date_Ended: '07/2016', Realtime_Stats: 0, Target_Location: 'Los Angeles', colors:['green'], fruit:['cherry'], Last_Updated:['4/10/2007'], Item_Name: 'Campaign 2', state: 'CA'},
      {Status: 'active', Priority: 'medium', Date_Started: '05/12/2016', Date_Ended: '07/2016', Realtime_Stats: 5, Target_Location: 'San Francisco', colors:['red'], fruit:['cherry'], Last_Updated: '4/19/2007', Item_Name: 'Campaign 3', state: 'CA'},
      {Status: 'ongoing', Priority: 'high', Date_Started: '05/14/2016', Date_Ended: '05/14/2016', Realtime_Stats: 3, Target_Location: 'New York', colors:['red','blue'], fruit:['apple','cherry'], Last_Updated: '2/15/2006', Item_Name: 'Campaign 4', state: 'NY'},
    ];

    var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    var nameEditor = new Y.TextAreaCellEditor(
      {
        validator: {
          rules: {
            name: {
              email: true,
              required: true
            }
          }
        }
      }
    );

    var fruitEditor = new Y.DropDownCellEditor(
      {
        editable: true,
        multiple: true,
        options: {
          apple: 'Apple',
          banana: 'Banana',
          cherry: 'Cherry',
          kiwi: 'Kiwi'
        },
        validator: {
          rules: {
            value: {
              required: true
            }
          }
        }
      }
    );

    var nestedCols = [

      {
        editor: nameEditor,
        key: 'Last_Updated',
        sortable: true
      },

      // {
      //   editor: new Y.RadioCellEditor(
      //     {
      //       editable: true,
      //       options: {
      //         yes: 'Yes',
      //         no: 'No',
      //         maybe: 'Maybe'
      //       }
      //     }
      //   ),
      //   key: 'active'
      // },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Status',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Priority',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Started',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Date_Ended',
        sortable: true
      },

      {
        editor: new Y.TextAreaCellEditor(),
        key: 'Target_Location',
        sortable: true
      },

      // {
      //   editor: new Y.DropDownCellEditor(
      //     {
      //       editable: true,
      //       options: states
      //     }
      //   ),
      //   key: 'state'
      // },

   

      // {
      //   editor: new Y.CheckboxCellEditor(
      //     {
      //       editable: true,
      //       multiple: true,
      //       options: {
      //         red: 'Red',
      //         green: 'Green',
      //         blue: 'Blue'
      //       }
      //     }
      //   ),
      //   key: 'colors'
      // },

      {
        editor: new Y.DateCellEditor(
          {
            calendar: {
              selectionMode: 'multiple',
              showNextMonth: false,
              showPrevMonth: false,
              width: '250px'
            },
            dateFormat: '%m/%d/%Y',
            validator: {
              rules: {
                value: {
                  required: true
                }
              }
            }
          }
        ),
        key: 'Last_Updated',
        sortable: true
      },

   {
        editor: new Y.TextCellEditor(
          {
            inputFormatter: Y.DataType.String.evaluate,
            validator: {
              rules: {
                value: {
                  number: true,
                  required: true
                }
              }
            }
          }
        ),
        key: 'Realtime_Stats',
        sortable: true
      },

      // {
      //   editor: fruitEditor,
      //   key: 'fruit',
      //   sortable: true
      // }
    
    ];



    var dataTable = new Y.DataTable(
      {
        columns: nestedCols,
        data: remoteData,
        editEvent: 'dblclick',
        plugins: [
          {
            cfg: {
              highlightRange: false
            },
            fn: Y.Plugin.DataTableHighlight
          }
        ]
      }
    ).render('#statsDataTable3');

    dataTable.get('boundingBox').unselectable();
  }
);