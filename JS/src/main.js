/*
  Flickr API key: 71a7cd8db01db04b8e4bfd22408838a1
  Secret: 121bbd23f4152989
*/
var flickr_api_key = "71a7cd8db01db04b8e4bfd22408838a1";
var imagesJSONRequest = new XMLHttpRequest();

window.searchValue = "";
window.imagesValue = "";
window.displayMessageValue = "";
window.sortTypeValue = "relevance";

/*----------- App Component -----------*/
var App = React.createClass({
  render: function(){
    return(
      <Content />
    );
  }
});

/*----------- Page Content Component -----------*/
var Content = React.createClass({
  getInitialState: function(){
    return{
      searchText:window.searchValue,
      images:window.imagesValue,
      displayMessage:window.displayMessageValue,
      sortType:window.sortTypeValue
    };
  },
  componentWillMount: function(){
    this.updateSearchText();
  },
  updateSearchText: function(event, sort){
    var searchQuery;
    if(event !== undefined) {
      searchQuery = event.target.value.trim();
      this.setState({searchText: event.target.value});
    }
    else {
      searchQuery = this.state.searchText.trim();
    }

    var sortString;
    if(sort !== undefined) {
      sortString = "&sort=" + sort;
    }
    else {
      sortString = "&sort=" + this.state.sortType;
    }

    var requestString = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickr_api_key + "&text=" + encodeURIComponent(searchQuery) + sortString + "&format=json&nojsoncallback=1";

    var thisComponent = this;
    imagesJSONRequest.onreadystatechange = function() {
      thisComponent.updateImages(imagesJSONRequest.readyState, imagesJSONRequest.status, imagesJSONRequest.responseText);
    };

    imagesJSONRequest.open("GET", requestString, true);
    // console.log(requestString);
    imagesJSONRequest.send();

    if(event !== undefined && sort !== undefined) {
      this.updateStores(event.target.value, sort);
    }
    else if(event !== undefined && sort === undefined) {
      this.updateStores(event.target.value, this.state.sortType);
    }
    else if(event === undefined && sort !== undefined) {
      this.updateStores(this.state.searchText, sort);
    }
    else {
      this.updateStores(this.state.searchText, this.state.sortType);
    }

  },
  updateStores: function(search, sort) {
    window.searchValue = search;
    window.imagesValue = this.state.images;
    window.displayMessageValue = this.state.displayMessage;
    window.sortTypeValue = sort;
  },
  updateImages: function(readyState, status, responseText){
    console.log("images updated!");
    if(readyState == 4){
      if(status == 200) {
        if(responseText.substr(0, 13) === '{"stat":"fail"') {
          this.setState({images: ""});
          this.setState({displayMessage: "Search failed."});
        }
        else {
          this.setState({images: responseText});
          this.setState({displayMessage: ""});
        }
      }
      else {
        this.setState({displayMessage: "No images matching your search criteria were found."});
        this.setState({images: ""});
      }
    }
    else {
      this.setState({displayMessage: "Searching..."});
      this.setState({images: ""});
    }
    this.render();
  },
  sortUpdate: function(event){
    this.setState({sortType: event.target.value});
    this.updateSearchText(undefined, event.target.value);
  },
  render: function(){
    // console.log("App render update.");
    return (
      <div className="container">
        <header>
          <Search textValue={this.state.searchText} searchTextUpdateHandler={this.updateSearchText} />
        </header>
        <section>
          <Display showPlaceHolder={this.state.searchText.length === 0} imagesJSON={this.state.images} displayMessage={this.state.displayMessage} />
        </section>
        <footer>
          {this.state.images != "" && this.state.searchText !== "" ? <Sort sortUpdateHandler={this.sortUpdate} selectedSortType={this.state.sortType} /> : null}
        </footer>
      </div>
    );
  }
});

/*----------- Search Bar Component -----------*/
var Search = React.createClass({
  render: function(){
    return (
      <input type="search" style={searchBarStyle} className="searchBar" placeholder="Search" onChange={this.props.searchTextUpdateHandler} value={this.props.textValue}></input>
    );
  }
});
var searchBarStyle = {
  width: "57.5%",
  display: "block",
  margin: "5px auto 0 auto",
  WebkitAppearance: "none",
  border: "none",
  borderBottom: "1px solid gray",
  height: "75px",
  fontSize: "1.85em",
  paddingLeft: "5px",
  outline: "none"
};
var searchBarWithTextStyle = searchBarStyle + {
  fontWeight: "bold"
};

/*----------- Image Display Grid Components -----------*/
var Display = React.createClass({
  render: function(){
    return(
      <div>{this.props.showPlaceHolder? <PlaceHolderImage /> : <ImagesGrid imagesJSON={this.props.imagesJSON} displayMessage={this.props.displayMessage} />}</div>
    );
  }
});
var PlaceHolderImage = React.createClass({
  render: function(){
    return(
      <figure>

        <br />
        <figcaption style={placeHolderImageCaptionStyle}>Type a query into the search bar and relevant images from <a style={{color:"black"}} target="_blank" href="http://flickr.com">Flickr</a> will display here in a grid.
        </figcaption>
        <img src="Images/placeholder.svg" style={placeHolderImageStyle} className="placeHolderImage"></img>
        <br />
        <div style={portfolioLinksStyle}>
          <a style={portfolioLinkStyle} href="http://tadhgcreedon.github.io">Tadhg Creedon</a> |&nbsp;
          <a style={portfolioLinkStyle} href="http://github.com/tadhgcreedon/flickr-search">Source</a> | 2016
        </div>
      </figure>
    );
  }
});
var placeHolderImageStyle = {
  display: "block",
  margin: "25px auto 0 auto",
  width: "600px"
}
var placeHolderImageCaptionStyle = {
  textAlign: "center",
  fontFamily: "monospace",
  fontSize: "1.25em",
  marginTop: "5px"
}
var ImagesGrid = React.createClass({
  render: function(){
    var displayContent;
    if(this.props.displayMessage === "" && JSON.parse(this.props.imagesJSON)["photos"] !== undefined) {
      var parsedJSON = JSON.parse(this.props.imagesJSON);
      displayContent = [];
      for(var i = 0; i < 20; i++) {
        if(parsedJSON["photos"]["photo"][i] !== undefined) {
          displayContent[i] = <ReactRouter.Link to={"/photo/" +
            parsedJSON["photos"]["photo"][i]["farm"] + "/" + parsedJSON["photos"]["photo"][i]["server"] +
              "/" + parsedJSON["photos"]["photo"][i]["id"] + "/" + parsedJSON["photos"]["photo"][i]["secret"]}>
            <img style={imageStyle} className="imghover" src={"https://farm" + parsedJSON["photos"]["photo"][i]["farm"]
              + ".staticflickr.com/" + parsedJSON["photos"]["photo"][i]["server"] + "/"
                + parsedJSON["photos"]["photo"][i]["id"] + "_"
                  + parsedJSON["photos"]["photo"][i]["secret"] + ".jpg"}></img></ReactRouter.Link>;
        }
        else {
          break;
        }
      }
    }
    else {
      displayContent = this.props.displayMessage;
    }
    return(
      <div style={displayContent !== this.props.displayMessage? imagesGridStyle : displayMessageStyle} className={displayContent !== this.props.displayMessage? "imagesGrid" : "displayMessage"}>{displayContent}</div>
    );
  }
});

var imagesGridStyle = {
  display: "block",
  backgroundColor: "#333",
  margin: "15px 0 0 0",
  borderTop: "2.5px solid #333",
  borderBottom: "2.5px solid #333"
};
var displayMessageStyle = {
  fontSize: "3em",
  textAlign: "center",
  marginTop: "15px",
  fontWeight: "bold"
};
var imageStyle = {
  height: "150px",
  borderTop: "2.5px solid #333",
  borderBottom: "2.5px solid #333",
  borderLeft: "5px solid #333"
};
var portfolioLinkStyle = {
  color: "gray"
};
var portfolioLinksStyle = {
  color: "gray",
  textAlign: "center",
  fontSize: "1.15em"
};

/*----------- Sort Select Box Component -----------*/
var Sort = React.createClass({
    render: function(){
      return(
        <div style={sortContainerStyle}>
          <label htmlFor="sortSelect"><strong>Sort By:</strong>&nbsp;</label>
          <select id="sortSelect" style={sortStyle} onChange={this.props.sortUpdateHandler}>
            <SortOption selected={this.props.selectedSortType == "relevance"} optionValue="relevance" optionText="Relevance" />
            <SortOption selected={this.props.selectedSortType == "date-posted-asc"} optionValue="date-posted-asc" optionText="Date ascending" />
            <SortOption selected={this.props.selectedSortType == "date-posted-desc"} optionValue="date-posted-desc" optionText="Date descending" />
          </select>
        </div>
      );
    }
});
var SortOption = React.createClass({
    render: function(){
      return(
        <option selected={this.props.selected} value={this.props.optionValue}>{this.props.optionText}</option>
      );
    }
});
var sortContainerStyle = {
  margin: "5px 0 5px 5px"
};
var sortStyle = {
  padding: "2px 0 2px 5px",
  width: "120px",
  height: "30px",
  outline: "none"
};
//I found the background up/down arrows solution at http://stackoverflow.com/a/22156412

/*----------- Individual Photo component -----------*/
var Photo = React.createClass({
  render: function(){
    return(
      <div>
        <div style={photoDivStyle}>
          <img style={photoStyle} src={"https://farm" + this.props.params.farm + ".staticflickr.com/" + this.props.params.server +
            "/" + this.props.params.photoId + "_" + this.props.params.secret + ".jpg"}></img>
        </div>
        <button style={buttonStyle}>
          <ReactRouter.IndexLink to="/" style={buttonLinkStyle}>Back to Search</ReactRouter.IndexLink>
        </button>
      </div>
    );
  }
});
var photoDivStyle = {
  backgroundColor: "#333",
  borderTop: "10px solid #333",
  borderBottom: "10px solid #333"
};
var photoStyle = {
  display: "block",
  margin: "0 auto 0 auto",
};
var buttonStyle = {
  height: "30px",
  margin: "5px 0 0 5px",
  outline:"none"
};
var buttonLinkStyle = {
  textDecoration: "none",
  color: "black"
};

/*----------- Render Page Content -----------*/
ReactDOM.render((
    <ReactRouter.Router history={ReactRouter.hashHistory}>
      <ReactRouter.Route path="/" component={App} />
      <ReactRouter.Route path="/photo/:farm/:server/:photoId/:secret" component={Photo} />
    </ReactRouter.Router>
), document.getElementById("container"));
