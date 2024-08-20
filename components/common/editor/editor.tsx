import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({
  content,
  handleEditorChange,
}: {
  content: string | undefined;
  handleEditorChange: (content: string) => void | undefined;
}) => {
  return (
    <Editor
      apiKey="dejngrr1qnkz9yo6gpmkoh5qf4e0o06jxfx5h5btp7zu4tn0"
      value={content}
      init={{
        height: 400,
        maxWidth: "50vw",
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "codesample",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help | \
          code codesample",
        setup: (editor) => {
          editor.on('paste', (e) => {
            const pastedData = e.clipboardData && e.clipboardData.getData('text/plain');

            e.preventDefault();

            editor.insertContent(`<code>${pastedData && pastedData.replace(/\n/g, '<br />')}</code>`);
          });

          editor.on('keydown', (e) => {
            if (e.key === 'Enter' && editor.selection.getNode().nodeName === 'CODE') {
              e.preventDefault();
              
              editor.insertContent('<br />');
            }
          });
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
