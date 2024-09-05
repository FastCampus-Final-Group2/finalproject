"use client";

import { useEffect, useState } from "react";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber"; // api
import { DispatchResult } from "@/models/ApiTypes"; // interface
import DispatchLists from "@/components/Dispatchlists";
import TabForDispatchedList from "@/components/TabForDispatchedList";
import SearchBars from "@/components/SearchBar";
import PaginationButtons from "@/components/core/Pagination";
import ListSelection from "@/components/ListSelection";

const ControlPage = () => {
  const [selectedState, setSelectedState] = useState("주행중");
  const [filteredResults, setFilteredResults] = useState<DispatchResult[]>([]);
  const [page, setPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);
  const [data, setData] = useState<DispatchResult[]>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async (status: "IN_TRANSIT" | "WAITING" | "COMPLETED") => {
      try {
        const data = await DispatchNumberApi.search({
          request: {
            status: status,
            isManager: false,
            startDate: "",
            endDateTime: "",
            searchOption: "",
            searchKeyword: "",
          },
        });

        if (data.error) {
          console.error(data.error);
        } else {
          setData(data.results || []);
        }
      } catch (err) {
        console.error("An error occurred while fetching data:", err);
      }
    };

    fetchData(selectedState).catch((err) => console.error("Failed to fetch data:", err));
  }, [selectedState]);
  console.log(data);
  useEffect(() => {
    const filterResults = (): DispatchResult[] => {
      switch (selectedState) {
        case "주행중":
          return data.filter((item) => item.progress > 0 && item.progress < 100);
        case "주행대기":
          return data.filter((item) => item.progress === 0);
        case "주행완료":
          return data.filter((item) => item.progress === 100);
        default:
          return [];
      }
    };

    const results = filterResults();
    setFilteredResults(results);
    setPage(1);
    setCurrentPageGroup(1);
  }, [selectedState, data]);

  const paginatedResults = filteredResults.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <div className="flex flex-col gap-[28px] pl-[10px]">
        <SearchBars data={data} />
        <TabForDispatchedList
          data={{
            IN_TRANSIT: data.filter((item) => item.progress > 0 && item.progress < 100).length,
            WAITING: data.filter((item) => item.progress === 0).length,
            COMPLETED: data.filter((item) => item.progress === 100).length,
          }}
          onStateChange={setSelectedState}
        />
        <ListSelection data={data} />
        <DispatchLists
          data={{
            IN_TRANSIT: filteredResults.filter((item) => item.progress > 0 && item.progress < 100).length,
            WAITING: filteredResults.filter((item) => item.progress === 0).length,
            COMPLETED: filteredResults.filter((item) => item.progress === 100).length,
            results: paginatedResults,
          }}
        />
        <Pagination currentPage={page} totalItems={filteredResults.length} onPageChange={setPage} />
      </div>
    </>
  );
};

export default ControlPage;
