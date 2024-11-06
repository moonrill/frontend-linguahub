"use client";

import CouponModal from "#/components/Modal/CouponModal";
import StatusBadge from "#/components/StatusBadge";
import CustomTable from "#/components/Tables/CustomTable";
import { Coupon } from "#/types/CouponTypes";
import { couponRepository } from "#/repository/coupon";
import { Button, Dropdown, Input, MenuProps, message, TableProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const AdminCoupon = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") || 1);
  const status = searchParams?.get("status") || "all";
  const statusParam = status === "all" ? undefined : status;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: listCoupon, isLoading, mutate } = couponRepository.hooks.useGetUserCoupons(
    statusParam,
    10,
    page,
    "date",
    "desc"
  );

  const handlePageChange = (page: number) => {
    router.push(`dashboard/promotion/coupon?page=${page}`);
  };

  // Function to handle status toggling
  const toggleStatus = async (id: string) => {
    try {
      await couponRepository.api.toggleStatus(id);
      mutate(); // Re-fetch data after toggling
      message.success("Coupon status updated successfully");
    } catch (error: any) {
      message.error(
        error.response.body?.message || "Error toggling coupon",
        5
      );
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <p className="uppercase">{record.name}</p>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (_, record) => <p className="uppercase">{record.discount}</p>,
    },
    {
      title: "Expired Date",
      dataIndex: "expired",
      key: "expired",
      render: (_, record) => <p className="uppercase">{record.expired}</p>,
    },
    {
      title: "Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (text) => (
        <div className="w-fit">
          <StatusBadge text={text} status={text} />
        </div>
      ),
    },
    {
      title: "Total Claimed",
      dataIndex: "claimed",
      key: "claimed",
      render: (_, record) => <p className="uppercase">{record.claimed}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: actionDropdownItem(record),
          }}
        >
          <Icon
            icon={"tabler:dots"}
            className="text-gray-500 text-2xl cursor-pointer p-2 hover:bg-zinc-200 rounded-lg transition-all duration-500"
          />
        </Dropdown>
      ),
    },
  ];

  // Action Dropdown Items (Edit and Toggle Status)
  const actionDropdownItem = (coupon: Coupon): MenuProps["items"] => {
    return [
      {
        key: "1",
        label: (
          <div className="flex items-center">
            <Icon
              icon={"hugeicons:pencil-edit-01"}
              className="text-lg 2xl:text-xl"
            />
            <span className="ml-2 text-xs 2xl:text-sm">Edit</span>
          </div>
        ),
        onClick: () => {
          setSelectedCoupon(coupon);
          setOpenDetailModal(true);
        },
      },
      {
        key: "2",
        label: (
          <div className="flex items-center">
            <Icon
              icon={"tabler:circle-filled"}
              className={`text-lg 2xl:text-xl ${coupon.requestStatus !== "Active" ? "text-green-500" : "text-rose-500"}`}
            />
            <span className="ml-2 text-xs 2xl:text-sm">
              {coupon.requestStatus !== "Active" ? "Activate" : "Deactivate"}
            </span>
          </div>
        ),
        onClick: () => toggleStatus(coupon.id),
      },
    ];
  };

  // Open/Close coupon modal for details
  const handleModalClose = () => setOpenDetailModal(false);

  // Filtered coupons based on search query
  const filteredCoupons = listCoupon?.data.filter(coupon =>
    coupon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-white w-full rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search..."
          prefix={<Icon icon="iconamoon:search-light" height={24} className="text-zinc-400" />}
          className="h-12 w-1/4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          type="primary"
          className="py-3 px-5 w-fit h-fit text-sm rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          Add New
          <Icon icon="ph:plus" className="text-xl ml-2" />
        </Button>
      </div>
      <CustomTable
        columns={columns}
        data={filteredCoupons || []} // Use filtered coupons
        isLoading={isLoading}
        onPageChange={handlePageChange}
        currentPage={page}
        total={listCoupon?.total || 0}
      />
      {openDetailModal && selectedCoupon && (
        <CouponModal
          isOpen={openDetailModal}
          coupon={selectedCoupon}
          onClose={handleModalClose}
        />
      )}
    </main>
  );
};

export default AdminCoupon;
