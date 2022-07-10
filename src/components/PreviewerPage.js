import React, { useState } from "react";
import { marked } from "marked";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import { ReactSession } from "react-client-session";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

// Allows line breaks with the return button
marked.setOptions({
  breaks: true,
});

// Set a function to be used by the marked Renderer, the bit that takes markdown and translates it to html, and create a callback for links to return the link in a diffrent format then the default.
const renderer = new marked.Renderer();

function PreviewerPage() {
  const [markdown, setMarkdown] = useState(placeholder);
  const navigate = useNavigate();
  
  async function onSave() {
    console.log(ReactSession.get("token"));
    if (ReactSession.get("token")) {
      await fetch(`${API}/users/saveData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${ReactSession.get("token")}`,
        },
        body: JSON.stringify({
          markdown: markdown,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      navigate('/sign-in')
    }
  }

  async function onLoad() {
    console.log(ReactSession.get("token"));
    if (ReactSession.get("token")) {
      await fetch(`${API}/users/saveData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${ReactSession.get("token")}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.markdown);
          setMarkdown(res.markdown);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
      navigate('/sign-in')
    }
  }

  return (
    <>
      <div className="AppWrap">
        <Editor
          markdown={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <Previewer markdown={markdown} />
      </div>
      <div className="save">
        <Button variant="contained" sx={{ height: 30 }} onClick={onSave}>
          Save Progress
        </Button>
        <Button variant="contained" sx={{ height: 30 }} onClick={onLoad}>
          Load Last Save Progress
        </Button>
      </div>
    </>
  );
}

export default PreviewerPage;

const Cards = ({ title, content }) => {
  return (
    <Card sx={{ minWidth: 400, maxWidth: 1 / 3 }} raised={true}>
      <CardHeader
        title={title}
        sx={{ backgroundColor: "black", color: "white" }}
      />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

const Editor = (props) => {
  return (
    <Cards
      title="Editor"
      content={
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          sx={{ width: 800, ml: 20, maxWidth: 400 }}
          id="editor"
          value={props.markdown}
          onChange={props.onChange}
          type="text"
          maxRows={30}
        />
      }
    />
  );
};

const Previewer = (props) => {
  return (
    <Cards
      title="Previewer"
      content={
        <div
          id="previewer"
          dangerouslySetInnerHTML={{
            __html: marked(props.markdown, { renderer: renderer }),
          }}
        />
      }
    />
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!`;
