import 'prismjs/themes/prism.css'
import { Copy } from 'lucide-react'
import Prism from 'prismjs'
import { useState } from 'react'
import { toast } from 'sonner'

export const HTMLCode = ({ code }: { code: string }) => {
  const [editableCode, setEditableCode] = useState(code)

  const html = Prism.highlight(code, Prism.languages.html, 'html')

  const copyCode = () => {
    navigator.clipboard.writeText(editableCode)
    toast.success('Copied to clipboard')
  }

  const updateEditableCode = (e: React.FormEvent<HTMLPreElement>) => {
    const code = e.currentTarget.innerText
    setEditableCode(code)
  }

  return (
    <div className="bg-gray-200 p-4 rounded-md relative">
      <Copy className="absolute top-4 right-4 cursor-pointer" onClick={copyCode} />
      <pre
        style={{ maxWidth: '100%', overflowX: 'auto', wordWrap: 'break-word' }}
        contentEditable
        onInput={updateEditableCode}
        className="p-4"
      >
        <code
          className="language-html"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </pre>
    </div>
  )
}
