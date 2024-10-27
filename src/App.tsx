import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { DispositionType, Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [transcripts, setTranscripts] = useState<Array<Schema["Transcript"]["type"]>>([]);

  useEffect(() => {
  
    client.models.Transcript.observeQuery().subscribe({
      next: (data) => setTranscripts([...data.items]),
      error: (err) => {
        console.error('Subscription error:', err);
      }});
  }, []);



  return (
    <div className="min-h-screen w-full flex flex-col">
       {/* Optional Header */}
       <header className="w-full  flex items-center justify-center m-5">
        
        <div>
        Welcome To RESVA Supervisor AI
        <br />
      
      </div>
      </header>
    <main className="flex-1 w-full flex items-center justify-center">
      <h1>My Transcripts</h1>
    
      <div className="flex flex-col w-45">
  <div className="overflow-x-auto">
    <div className="py-2 align-middle inline-block min-w-full">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent Disposition
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supervisor AI Outcome
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transcripts.map((transcript) => {
              const outcome = transcript?.Disposition 
              ? (JSON.parse(transcript.Disposition) as DispositionType).Outcome 
              : 'Unknown Outcome';

              return (
                <tr key={transcript.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transcript.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transcript.tname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {outcome}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<p></p>
      
    </main>
      {/* Optional Footer */}
      <footer className="flex flex-col w-full items-center justify-center m-5">
      
      <button onClick={signOut}>Sign out</button>

        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
