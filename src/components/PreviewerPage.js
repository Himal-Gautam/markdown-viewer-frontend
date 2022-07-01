import React, { useState } from "react";
import { marked } from "marked";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/material/TextareaAutosize";

// Allows line breaks with the return button
marked.setOptions({
  breaks: true,
});

// Set a function to be used by the marked Renderer, the bit that takes markdown and translates it to html, and create a callback for links to return the link in a diffrent format then the default.
const renderer = new marked.Renderer();

function PreviewerPage() {
  const [markdown, setMarkdown] = useState(placeholder);

  return (
    <div className="AppWrap">
      <Editor
        markdown={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <Previewer markdown={markdown} />
    </div>
  );
}

export default PreviewerPage;

const Cards = ({ title, content }) => {
  return (
    <Card sx={{ minWidth: 400, maxWidth:1/3 }} raised={true}>
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
