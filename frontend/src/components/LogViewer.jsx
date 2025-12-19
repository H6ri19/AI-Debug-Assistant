import React, {useState} from 'react'

export default function LogViewer(){
  const [logs, setLogs] = useState('')
  return (
    <div className="mt-4 bg-white p-2 rounded border">
      <h3 className="font-medium">Logs</h3>
      <textarea value={logs} onChange={e=>setLogs(e.target.value)} className="w-full h-40 p-2 border mt-2" />
    </div>
  )
}
