import * as jsxRuntime from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { NavLink, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useForm } from "react-hook-form";
import { setupListeners } from "@reduxjs/toolkit/query";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function searchIdStore(arr, id) {
  const index = arr.findIndex((elem) => elem.id === id);
  return index !== -1 ? arr[index].isLike : false;
}
const initialState$3 = {
  likes: []
};
const likeCardSlice = createSlice({
  name: "likes",
  initialState: initialState$3,
  reducers: {
    setLike: (state, action) => {
      state.likes = action.payload;
    }
  }
});
const { setLike } = likeCardSlice.actions;
const likeCardReducer = likeCardSlice.reducer;
function ImageLike(props) {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes.likes);
  const [isLike, setIsLike] = useState(searchIdStore(likes, props.id));
  useEffect(() => {
    const id = props.id;
    const index = likes.findIndex((elem) => elem.id === id);
    let newLikes = [];
    if (index !== -1) {
      newLikes = [...likes.slice(0, index), { id, isLike }, ...likes.slice(index + 1)];
    } else {
      newLikes = [...likes, { id, isLike }];
    }
    if (isLike !== searchIdStore(likes, props.id)) {
      dispatch(setLike(newLikes));
    }
  }, [dispatch, isLike, likes, props.id]);
  const handleClick = () => {
    setIsLike(!isLike);
  };
  const toggleClass = isLike ? " active" : "";
  return /* @__PURE__ */ jsx("div", { className: "like-image", children: /* @__PURE__ */ jsx(
    "svg",
    {
      "data-testid": "like-image",
      fill: "#73818c",
      width: "32px",
      height: "32px",
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      className: `likeHeart${toggleClass}`,
      onClick: handleClick,
      children: /* @__PURE__ */ jsx("path", { d: "M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z" })
    }
  ) });
}
const initialState$2 = {
  persons: [],
  id: 0
};
const personsSlice = createSlice({
  name: "persons",
  initialState: initialState$2,
  reducers: {
    changePersons: (state, action) => {
      state.persons = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  }
});
const { changePersons, setId } = personsSlice.actions;
const personsReducer = personsSlice.reducer;
function Card({ person, onShowDetails }) {
  const dispatch = useDispatch();
  return /* @__PURE__ */ jsxs("div", { "data-testid": "card", className: "card", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        "data-testid": "card-description",
        className: "card-description",
        onClick: () => {
          dispatch(setId(person.id));
          onShowDetails();
        },
        children: [
          /* @__PURE__ */ jsx("img", { className: "image-product", src: person.image, alt: "image product" }),
          /* @__PURE__ */ jsx("p", { className: "name-person", children: person.name })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ImageLike, { id: person.id })
  ] });
}
function CardList({ persons, onShowDetails }) {
  return /* @__PURE__ */ jsx("div", { "data-testid": "container_cards", className: "container_cards", children: persons.map((person) => /* @__PURE__ */ jsx(Card, { person, onShowDetails }, person.id)) });
}
const logo = "/assets/logo-store-19adfa78.png";
function Header() {
  return /* @__PURE__ */ jsxs("header", { "data-testid": "header", className: "header", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NavLink, { to: "/", className: "logo", children: /* @__PURE__ */ jsx("img", { className: "logo", src: logo, alt: "" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "wrapper_navigation", children: /* @__PURE__ */ jsx("nav", { className: "navigation", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          className: "navigation_link",
          to: "/",
          style: ({ isActive }) => isActive ? {
            textDecoration: "none",
            color: "gold"
          } : {},
          children: "Home"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          className: "navigation_link",
          to: "/about",
          style: ({ isActive }) => isActive ? {
            textDecoration: "none",
            color: "gold"
          } : {},
          children: "About"
        }
      ) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavLink,
        {
          className: "navigation_link",
          to: "/forms",
          style: ({ isActive }) => isActive ? {
            textDecoration: "none",
            color: "gold"
          } : {},
          children: "Form"
        }
      ) })
    ] }) }) })
  ] });
}
const githubIcon = "/assets/github_icon-c51a0dcf.svg";
const rssIcon = "/assets/rs_school-5051c991.svg";
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    /* @__PURE__ */ jsx("a", { href: "https://github.com/Siaw4ik", children: /* @__PURE__ */ jsx("img", { className: "githubIcon", src: githubIcon, alt: "github link" }) }),
    /* @__PURE__ */ jsxs("div", { className: "footer_description", children: [
      /* @__PURE__ */ jsx("p", { children: "Online Store 2023" }),
      /* @__PURE__ */ jsx("p", { children: "React" })
    ] }),
    /* @__PURE__ */ jsx("a", { href: "https://rs.school/js/", children: /* @__PURE__ */ jsx("img", { className: "rssIcon", src: rssIcon, alt: "RSSchool link" }) })
  ] });
}
const glass = "/assets/search_glass-715aed70.png";
const initialState$1 = {
  inputValue: ""
};
const searchSlice = createSlice({
  name: "search",
  initialState: initialState$1,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    }
  }
});
const { setInputValue } = searchSlice.actions;
const searchReducer = searchSlice.reducer;
function SearchBar() {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.search.inputValue);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchRef.current) {
      dispatch(setInputValue(searchRef.current.value));
    }
  };
  return /* @__PURE__ */ jsxs("form", { "data-testid": "searchbarForm", className: "searchBar", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        "data-testid": "searchbar",
        type: "text",
        placeholder: "Search...",
        defaultValue: inputValue || "",
        ref: searchRef
      }
    ),
    /* @__PURE__ */ jsx("img", { "data-testid": "search-image", className: "searchGlass", src: glass, alt: "search image" })
  ] });
}
const cross = "/assets/close-c2a00dc0.svg";
const imageError = "/assets/rickandmortiError-a919477a.png";
function Error({ onMini }) {
  return /* @__PURE__ */ jsxs("div", { className: "container-errors", children: [
    /* @__PURE__ */ jsx("h3", { "data-testid": "title-error", children: "Error!" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "img-error",
        className: `imageError${onMini ? " mini" : ""}`,
        src: imageError,
        alt: "image error"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { children: "Your search result was not found!!!" }),
      /* @__PURE__ */ jsx("p", { children: "Please try again!!!" })
    ] })
  ] });
}
function Loader() {
  return /* @__PURE__ */ jsxs("div", { "data-testid": "loader", className: "lds-spinner", children: [
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", {})
  ] });
}
const rick_mortiApi = createApi({
  reducerPath: "rick_mortiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getPersonsStart: builder.query({
      query: () => `character`
    }),
    getPersonsByName: builder.query({
      query: (name) => `character/?name=${name}`
    }),
    getOnePersonById: builder.query({
      query: (id) => `character/${id}`
    })
  })
});
const { useGetPersonsStartQuery, useGetPersonsByNameQuery, useGetOnePersonByIdQuery } = rick_mortiApi;
function CardDetails({ onClose }) {
  const [person, setPerson] = useState();
  const id = useSelector((state) => state.persons.id);
  const { data, error, isFetching } = useGetOnePersonByIdQuery(id);
  useEffect(() => {
    setPerson(data);
  }, [data]);
  return /* @__PURE__ */ jsxs("div", { "data-testid": "container-cardDetails", className: "container-cardDetails", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        "data-testid": "cardDetails-cross",
        className: "cardDetails-cross",
        src: cross,
        alt: "image for close card details",
        onClick: () => onClose()
      }
    ),
    isFetching ? /* @__PURE__ */ jsx(Loader, {}) : error ? /* @__PURE__ */ jsx(Error, { onMini: true }) : /* @__PURE__ */ jsxs("div", { className: "cardDetails-description", children: [
      /* @__PURE__ */ jsx("img", { className: "cardDetails-image", src: person == null ? void 0 : person.image, alt: person == null ? void 0 : person.name }),
      /* @__PURE__ */ jsx("p", { "data-testid": "person-name", className: "person-name", children: person == null ? void 0 : person.name }),
      /* @__PURE__ */ jsxs("p", { className: "person-gender", children: [
        "Gender: ",
        person == null ? void 0 : person.gender
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "person-species", children: [
        "Spesies: ",
        person == null ? void 0 : person.species
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "person-location", children: [
        "Location: ",
        person == null ? void 0 : person.location.name
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "person-status", children: [
        "Status: ",
        person == null ? void 0 : person.status
      ] }),
      /* @__PURE__ */ jsx("p", { className: "cardDetails-date", children: person == null ? void 0 : person.created.split("T")[0] })
    ] })
  ] });
}
function HomePage() {
  const [isShow, setIsShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.search.inputValue);
  const persons = useSelector((state) => state.persons.persons);
  const {
    data: dataStart,
    error: errorStart,
    isFetching: isFetchingStart
  } = useGetPersonsStartQuery();
  useEffect(() => {
    if (dataStart) {
      dispatch(changePersons(dataStart.results));
    }
  }, [dataStart, dispatch]);
  const {
    data: dataSearch,
    error: errorSearch,
    isFetching: isFetchingSearch
  } = useGetPersonsByNameQuery(inputValue);
  useEffect(() => {
    if (inputValue !== "") {
      if (dataSearch) {
        dispatch(changePersons(dataSearch.results));
      }
    }
  }, [dataSearch, dispatch, errorSearch, inputValue]);
  useEffect(() => {
    if (isFetchingStart || isFetchingSearch) {
      setIsLoading(true);
    } else if (!isFetchingStart || !isFetchingSearch) {
      setIsLoading(false);
    }
    if (errorStart || errorSearch) {
      setShowError(true);
    } else if (!errorStart || !errorSearch) {
      setShowError(false);
    }
  }, [isFetchingStart, isFetchingSearch, errorStart, errorSearch]);
  return /* @__PURE__ */ jsxs("div", { "data-testid": "container", className: "container", children: [
    /* @__PURE__ */ jsxs("div", { className: "container_header-main", children: [
      /* @__PURE__ */ jsx(Header, {}),
      isShow && /* @__PURE__ */ jsx(
        "div",
        {
          "data-testid": "cardDetails-shadow",
          className: "cardDetails-shadow",
          onClick: () => {
            setIsShow(false);
          }
        }
      ),
      isShow && /* @__PURE__ */ jsx(
        CardDetails,
        {
          onClose: () => {
            setIsShow(false);
          }
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "main", children: /* @__PURE__ */ jsxs("div", { className: "container_home", children: [
        /* @__PURE__ */ jsx("h2", { "data-testid": "homepage-h1", children: "Library Rick and Morty" }),
        /* @__PURE__ */ jsx(SearchBar, {}),
        isLoading ? /* @__PURE__ */ jsx(Loader, {}) : showError ? /* @__PURE__ */ jsx(Error, { onMini: false }) : /* @__PURE__ */ jsx(CardList, { persons, onShowDetails: () => setIsShow(true) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function AboutPage() {
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "main", children: /* @__PURE__ */ jsx("h1", { "data-testid": "aboutpage-h1", children: "This is the ABOUT page" }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "main", children: /* @__PURE__ */ jsx("h1", { "data-testid": "404page-h1", children: "This is the 404 page" }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const initialState = {
  personsForm: []
};
const formSlice = createSlice({
  name: "formCards",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.personsForm.push(action.payload);
    }
  }
});
const { addPerson } = formSlice.actions;
const formReducer = formSlice.reducer;
function Form({ showModalWindow }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const person = {
      name: data.name,
      date: data.date,
      gender: data.gender,
      species: data.species,
      status: data.status,
      consent: data.consent,
      location: data.location,
      imageUrl: data.imageUpload ? URL.createObjectURL(data.imageUpload[0]) : ""
    };
    dispatch(addPerson(person));
    reset();
    showModalWindow();
    setTimeout(() => {
      showModalWindow();
    }, 2e3);
  };
  return /* @__PURE__ */ jsxs("form", { className: "wrapper_form", onSubmit: handleSubmit(onSubmit), "data-testid": "form", children: [
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          "data-testid": "name-input",
          type: "text",
          ...register("name", {
            required: "Enter a value in the field",
            validate: (value) => value[0] === value[0].toUpperCase() || "Value must start with a capital letter"
          })
        }
      ),
      errors.name && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.name.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Species" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          "data-testid": "species-select",
          defaultValue: "",
          ...register("species", { required: "Сhoose a value in the field" }),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "--Select species--" }),
            /* @__PURE__ */ jsx("option", { value: "Alien", children: "Alien" }),
            /* @__PURE__ */ jsx("option", { value: "Animal", children: "Animal" }),
            /* @__PURE__ */ jsx("option", { value: "Disease", children: "Disease" }),
            /* @__PURE__ */ jsx("option", { value: "Fish", children: "Fish" }),
            /* @__PURE__ */ jsx("option", { value: "Human", children: "Human" }),
            /* @__PURE__ */ jsx("option", { value: "Humanoid", children: "Humanoid" }),
            /* @__PURE__ */ jsx("option", { value: "Human with giant head", children: "Human with giant head" }),
            /* @__PURE__ */ jsx("option", { value: "Mythological Creature", children: "Mythological Creature" }),
            /* @__PURE__ */ jsx("option", { value: "Poopybutthole", children: "Poopybutthole" }),
            /* @__PURE__ */ jsx("option", { value: "Robot", children: "Robot" }),
            /* @__PURE__ */ jsx("option", { value: "Unknown", children: "Unknown" })
          ]
        }
      ),
      errors.species && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.species.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Status" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          "data-testid": "status-select",
          defaultValue: "",
          ...register("status", { required: "Сhoose a value in the field" }),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "--Select status--" }),
            /* @__PURE__ */ jsx("option", { value: "Alive", children: "Alive" }),
            /* @__PURE__ */ jsx("option", { value: "Dead", children: "Dead" }),
            /* @__PURE__ */ jsx("option", { value: "Unknown", children: "Unknown" })
          ]
        }
      ),
      errors.status && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.status.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Location" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          "data-testid": "location-input",
          type: "text",
          ...register("location", {
            required: "Enter a value in the field"
          })
        }
      ),
      errors.location && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.location.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div-column", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Gender" }),
      /* @__PURE__ */ jsxs("div", { className: "wrapper_radios", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Male" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              "data-testid": "gender-radio1",
              type: "radio",
              value: "Male",
              ...register("gender", { required: "Сhoose one of the values" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Female" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              value: "Female",
              "data-testid": "gender-radio2",
              ...register("gender", { required: "Сhoose one of the values" })
            }
          )
        ] })
      ] }),
      errors.gender && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.gender.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Date of person created" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          "data-testid": "date-input",
          type: "date",
          ...register("date", {
            required: "Enter a value in the field",
            validate: (value) => value.split("-")[0] === String((/* @__PURE__ */ new Date()).getFullYear()) || "You entered the wrong year"
          })
        }
      ),
      errors.date && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.date.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div-column", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "Upload picture" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          "data-testid": "image-input",
          type: "file",
          accept: "image/*",
          ...register("imageUpload", { required: "Upload a picture" })
        }
      ),
      errors.imageUpload && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.imageUpload.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div", children: [
      /* @__PURE__ */ jsx("p", { className: "forms_div-title", children: "I consent to the processing data" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          value: "true",
          "data-testid": "consent-check",
          defaultChecked: false,
          ...register("consent", {
            required: "Consent must be given"
          })
        }
      ),
      errors.consent && /* @__PURE__ */ jsx("span", { className: "error", role: "alert", children: errors.consent.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "forms_div buttons", children: [
      /* @__PURE__ */ jsx("div", { "data-testid": "resetBtn", className: "resetBtn", onClick: () => reset(), children: "Reset" }),
      /* @__PURE__ */ jsx("button", { "data-testid": "button", className: "btnForm", children: "Create product" })
    ] })
  ] });
}
function CardForm(props) {
  return /* @__PURE__ */ jsx("div", { "data-testid": "card", className: "cardForm", children: /* @__PURE__ */ jsxs("div", { className: "card-descriptionForm", children: [
    /* @__PURE__ */ jsx("img", { className: "image-productForm", src: props.person.imageUrl, alt: "image product" }),
    /* @__PURE__ */ jsxs("div", { className: "total-description-productForm", children: [
      /* @__PURE__ */ jsx("h3", { className: "title-personForm", children: props.person.name }),
      /* @__PURE__ */ jsxs("span", { className: "species-personForm", children: [
        "Species: ",
        props.person.species
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "gender-personForm", children: [
        "Gender: ",
        props.person.gender
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "status-personForm", children: [
        "Status: ",
        props.person.status
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "location-personForm", children: [
        "Location: ",
        props.person.location
      ] }),
      /* @__PURE__ */ jsx("p", { className: "date-personForm", children: props.person.date })
    ] })
  ] }) });
}
function FormsPage() {
  const [isActive, setIsActive] = useState(false);
  const persons = useSelector((state) => state.form.personsForm);
  const showModalWindow = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "main", children: /* @__PURE__ */ jsxs("div", { className: "container_formpage", children: [
      /* @__PURE__ */ jsxs("div", { className: "container_form-block", children: [
        /* @__PURE__ */ jsx("h3", { "data-testid": "formpage-formtitle", children: "Form for creating and adding a product" }),
        /* @__PURE__ */ jsx(Form, { showModalWindow })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container_createdCrads", children: [
        /* @__PURE__ */ jsx("h3", { "data-testid": "formpage-cardsformtitle", children: "Created and added products" }),
        /* @__PURE__ */ jsx("div", { "data-testid": "containerCards", className: "wrapper_cardList", children: persons.map((person, index) => /* @__PURE__ */ jsx(CardForm, { person }, index)) })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `modalWindow${isActive ? " active" : ""}`,
          "data-testid": "show-modal-button",
          children: /* @__PURE__ */ jsx("p", { children: "Data saved, card created" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const App$1 = "";
const headerFooter = "";
const homepage = "";
const formspage = "";
function App() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/forms", element: /* @__PURE__ */ jsx(FormsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
  ] }) });
}
const store = configureStore({
  reducer: {
    search: searchReducer,
    form: formReducer,
    persons: personsReducer,
    likes: likeCardReducer,
    [rick_mortiApi.reducerPath]: rick_mortiApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rick_mortiApi.middleware)
});
setupListeners(store.dispatch);
function render(url, opts) {
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }),
    opts
  );
  return stream;
}
export {
  render as default
};
