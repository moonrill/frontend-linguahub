"use client";

import React from "react";
import {Button, Card} from "antd";
import {store} from "#/store";
import {sampleRepository} from "#/repository/sample";

const Page = () => {
    const { data, error, isLoading }  = sampleRepository.hooks.useJoke();
    return <div>
        <div>
            home: {store.ui.title}
        </div>
        <div>
            fact: {data?.setup}
        </div>
        <Button className={"ml-8"} onClick={() => {
            store.ui.changeTitle("from home")
        }}>change title</Button>
    </div>;
};

export default Page;

