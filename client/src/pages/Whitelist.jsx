import React, {useEffect} from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Resize,
    Sort,
    ContextMenu,
    Filter,
    Page,
    ExcelExport,
    PdfExport,
    Edit,
    Inject
} from '@syncfusion/ej2-react-grids';

import {contextMenuItems, WhitelistGrid, userData, assetsData} from '../data/dummy';
import {Header, Addlist} from '../components';
import Button from '@mui/material/Button';
import axios from "axios";
import header from "../components/Header";


const Whitelist = () => {
    const userData = JSON.parse(sessionStorage.token).data;
    const localToken = JSON.parse(sessionStorage.token).token;
    const [whiteListData, setWhiteListData] = React.useState();

    useEffect(() => {
        axios.get('http://localhost:8089/api/whitelists',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localToken,
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json'
                }
            }
        )
            .then(res => {
                console.log(res);
                let resultWhitelists = res.data;


                setWhiteListData(resultWhitelists)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const editing = {allowDeleting: true, allowEditing: true};
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

            <Button style={{positon: "relative", left: "90%",}} variant="outlined"><Addlist dataSource={assetsData}
                                                                                            display={assetsData[4].image}
                                                                                            image={assetsData[4].image}
                                                                                            title="great"></Addlist></Button>


            <Header category="" title="Whitelist"/>
            <GridComponent
                id="gridcomp"
                dataSource={whiteListData}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={contextMenuItems}
                editSettings={editing}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {WhitelistGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
            </GridComponent>
        </div>
    );
};
export default Whitelist;
