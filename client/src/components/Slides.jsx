import React, {useEffect, useState} from 'react';
import {GridComponent, ColumnsDirective, ColumnDirective} from '@syncfusion/ej2-react-grids';
import {assetData1, assetData2, assetData3, assetGrid, assetsData} from '../data/dummy';
import Button from '@mui/material/Button';
import "swiper/css";
import "swiper/css/navigation";
import {useStateContext} from '../contexts/ContextProvider';
import axios from "axios";


// import required modules


const Slides = () => {


    useEffect(async () => {
        await axios.get('http://localhost:8089/api/wallets',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localToken,
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json'
                }
            }
        ).then((res) => {
            console.log(res.data);
            setTabs(res.data.tabs);

            setSource(res.data.source);

        }).catch((error) => {
            console.log(error);
        });

    }, []);

    const localData = JSON.parse(sessionStorage.token).data;
    const localToken = JSON.parse(sessionStorage.token).token;
    const [currentTab, setCurrentTab] = useState('1');
    const [tabs,setTabs] = useState([])

    const [source,setSource] = useState([])

    const { currentColor } = useStateContext();

    const toolbarOptions = ['Search'];



    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (

        <div className='container' style={{ zIndex: 1 }} >

            <div class="" >
                <>
                    <div class="scrolling-wrapper">

                        {tabs.map((tab, i) =>


                                <Button class="card1" justify-self='center' key={i} id={tab.id}
                                variant="outlined" startIcon={<img src={tab.image} alt="" />}
                                onClick={(handleTabClick)}
                                style={{
                                    backgroundColor:  currentColor ,
                                }}
                                >
                              <p></p> <p></p>
      </Button>
                        )}
                    </div>
                </>
            </div>


            <div class="container" >
                {tabs.map((tab, i) =>
                    <div key={i}>

                        {currentTab === `${tab.id}` &&
                            <GridComponent dataSource={source[`${tab.id - 1}`]} pageSettings={{ pageCount: 5 }} toolbar={toolbarOptions}>
                                <ColumnsDirective >
                                    {assetGrid.map((item, index) => <ColumnDirective class='' key={index} {...item} />)}
                                </ColumnsDirective>
                            </GridComponent>}



                    </div>
                )}
            </div>
        </div>
    );
}

export default Slides;