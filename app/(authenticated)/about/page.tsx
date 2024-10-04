"use client";

import React from "react";
import {Button, Card} from "antd";
import {store} from "#/store";

const Page = () => {
    return <div>
        about: {store.ui.title}
        <Button onClick={() => {
            store.ui.changeTitle("from about")
        }}>change title</Button>
    </div>;
};

export default Page;

