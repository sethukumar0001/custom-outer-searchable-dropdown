import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import { getValue, setValue } from "./lodash";
// import { getLookupAPIs } from "./lookup-apis";
// import { QueryRequestHelper } from "common/query-request-helper";
// https://lottiefiles.com/90550-dot-loader-animation
// https://lottiefiles.com/39555-dot-trio-fast

const CustomSearchableDropdown = (props) => {
  const { label, id, value, searchLoading, removeClose, onChange } = props;

  const inputRef = useRef(null);
  const ref = useRef();

  /* -------------------------------------------------------------------------- */
  /*                               UseState Section                             */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const [data, setData] = useState([
    {
      value: "rock",
      name: "rock",
      label: "rock",
      id: 3,
    },
    {
      value: "rock1",
      name: "rock1",
      label: "rock1",
      id: 4,
    },

    {
      value: "rock2",
      name: "rock2",
      label: "rock2",
      id: 5,
    },
    {
      value: "rock3",
      name: "rock3",
      label: "rock3",
      id: 6,
    },
    {
      value: "rock4",
      name: "rock4",
      label: "rock4",
      id: 7,
    },
    {
      value: "rock5",
      name: "rock5",
      label: "rock5",
      id: 8,
    },
    {
      value: "rock6",
      name: "rock6",
      label: "rock6",
      id: 1,
    },
    {
      value: "rock7",
      name: "rock7",
      label: "rock7",
      id: 2,
    },
  ]);
  /* -------------------------------------------------------------------------- */
  /*                               UseEffect Section                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    fetchDefaultData();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setQuery("");
  }, [props.resetInput]);

  useEffect(() => {
    if (query) {
      setInputChange(true);
    }
  }, [query]);

  /* -------------------------------------------------------------------------- */
  /*                                     API Section                            */
  /* -------------------------------------------------------------------------- */

  const handleFetchData = async (search_text) => {
    // if (search_text)
    //   try {
    //     let payload = {
    //       search: search_text,
    //       page_no: 1,
    //       page_size: 10,
    //     };
    //     let queryRequest = QueryRequestHelper(payload);
    //     let resp = await getLookupAPIs(
    //       getValue(props, `lookup_api`, ""),
    //       queryRequest
    //     );
    //     if (resp) {
    //       let items =
    //         getValue(resp, `data.length`, 0) > 0
    //           ? getValue(resp, `data`, []).map((item) => ({
    //               id: getValue(item, `id`, ""),
    //               name:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               value:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               label:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               [label]:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //             }))
    //           : [];
    //       setData(items);
    //     }
    //   } catch (error) {}
    // else onChange(null);
  };
  const fetchDefaultData = async () => {
    // try {
    //   let payload = {
    //     page_no: 1,
    //     page_size: 10,
    //   };
    //   let queryRequest = QueryRequestHelper(payload);
    //   let resp = await getLookupAPIs(
    //     getValue(props, `lookup_api`, ""),
    //     queryRequest
    //   );
    //   if (resp) {
    //     let items =
    //       getValue(resp, `data.length`, 0) > 0
    //         ? getValue(resp, `data`, []).map((item) => ({
    //             id: getValue(item, `id`, ""),
    //             name:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             value:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             label:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             [label]:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //           }))
    //         : [];
    //     setData(items);
    //   }
    // } catch (error) {}
  };

  const handleClickOption = (option) => {
    onChange && onChange(option);
    setInputChange(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Onchange section                             */
  /* -------------------------------------------------------------------------- */
  const toggleBox = (e) => {
    setIsOpen(!isOpen);
  };
  const toggle = (e) => {
    setIsOpen(e && e.target === inputRef.current);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      //   console.log("clicked outside");
      setIsOpen(false);
    } else {
      //   console.log("click inside");
    }
  };
  const filter = (options) => {
    return getValue(options, `length`, 0) > 0
      ? options.filter(
          (option) =>
            getValue(option, `[${label}]`, "") &&
            option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      : [];
  };
  const findSelectedPipeline = (id) => {
    let list =
      getValue(data, `length`, 0) > 0
        ? data.filter((item) => getValue(item, `id`, "") === id)
        : [];
    return getValue(list, `length`, 0) > 0
      ? getValue(list, `[${0}].label`, "")
      : "";
  };
  const valueLabel = useMemo(
    () => findSelectedPipeline(value),
    [value, getValue(data, `length`, 0) > 0]
  );
  return (
    <>
      <div className={"dropdownselect-form"} ref={ref}>
        {/* <div
          className={`selected-value-box ${isOpen ? "active" : ""}`}
        >
          <div className="left-container">
            <img src={"/dropdown/search.svg"} className="search_image" />
            <input
              className="search_input"
              ref={inputRef}
              type="text"
              value={
                inputChange
                  ? query
                    ? query
                    : valueLabel
                  : valueLabel
                  ? valueLabel
                  : query
              }
              name="searchTerm"
              autoComplete="new-password"
              placeholder={getValue(props, `placeholder`, "Please Enter")}
              onChange={(e) => {
                setQuery(e.target.value);
                handleFetchData(e.target.value);
              }}
              onClick={toggleBox}
            />
          </div>
          <div className="right-container">
            <img
              src={"/dropdown/close.svg"}
              className="close_image"
              onClick={(e) => handleClose(e)}
            />
            <img
              src={
                isOpen ? "/dropdown/arrow_up.svg" : "/dropdown/arrow_down.svg"
              }
              className="arrow_image"
            />
          </div>
        </div> */}

        <div
          className={`selected-value-box position-relative ${
            isOpen ? "active" : ""
          }`}
          onClick={toggleBox} /* add custom width here */
        >
          <div className="search_container">
            <img src={"/dropdown/search.svg"} className="search_image" />
            <input
              className="search_input"
              ref={inputRef}
              type="text"
              value={
                inputChange
                  ? query
                    ? query
                    : valueLabel
                  : valueLabel
                  ? valueLabel
                  : query
              }
              name="searchTerm"
              autoComplete="off"
              placeholder={getValue(
                props,
                `placeholder`,
                "Please Search here..."
              )}
              onChange={(e) => {
                !e.target.value && onChange(null);
                setQuery(e.target.value);
                handleFetchData(e.target.value);
              }}
              onClick={toggleBox}
            />
          </div>
          <div className="right_container">
            {valueLabel && (
              <div className="close_image_container">
                <img
                  src={"/dropdown/close.svg"}
                  className="close_image"
                  onClick={(e) => handleClose(e)}
                />
              </div>
            )}
            <div className="arrow_image_container">
              <img
                src={
                  isOpen ? "/dropdown/arrow_up.svg" : "/dropdown/arrow_down.svg"
                }
                className="arrow_image"
              />
            </div>
          </div>
        </div>

        <div
          className={`options ${
            isOpen ? "open" : ""
          }`} /* add custom width here */
        >
          <div>
            <div className="option_container">
              {isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <img src={`/dropdown/loader1.gif`} className="loader" />
                </div>
              ) : filter(data).length > 0 ? (
                filter(data).map((option, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleClickOption(option);
                        toggle();
                      }}
                      className={`option ${
                        option.id === value ? "selected" : ""
                      }`}
                      key={`${id}-${index}`}
                    >
                      <div className="selected_text">{option[label]}</div>
                      {option.id === value && (
                        <img src="/dropdown/done.svg" className="done_image" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="nodata">No Data Found</div>
              )}
            </div>
          </div>
          {getValue(props, `add`, "") ? (
            <div className="button_container">
              <img src={"/dropdown/add.svg"} className="button_image" />
              <p className="button_input">Add Button</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CustomSearchableDropdown;
