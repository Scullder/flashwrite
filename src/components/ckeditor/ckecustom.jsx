import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const config = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    /* 'outdent',
    'indent',
    '|', */
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo'
  ]
};

export default function CKECustom(props) {
    return (
        <div id="custom-cke">
          <CKEditor
              editor={Editor}
              config={config}
              data={props.content}
              onChange={props.handler}
          />
        </div>
    )
}
