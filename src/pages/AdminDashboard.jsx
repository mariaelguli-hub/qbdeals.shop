{/* Tab 1: Visitors History Logs */}
          {activeTab === 'visitors' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-600" /> All Visitor Logs
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Complete history of visits to your site</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  Total Visits Tracked: {visitors.length}
                </span>
              </div>

              {visitors.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No visitors tracked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Visit Date & Time</th>
                        <th className="p-4">Visitor IP</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Visited Page</th>
                        <th className="p-4">Time Spent</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs text-gray-500 font-medium">
                            {new Date(v.last_seen).toLocaleString()}
                          </td>
                          <td className="p-4 font-mono text-xs font-semibold text-gray-900">
                            {v.ip_address || 'Unknown'}
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <Globe className="w-3.5 h-3.5 text-emerald-600" /> {v.location || 'Unknown'}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-emerald-700">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">
                              {v.current_page || '/'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">
                            <span className="inline-flex items-center gap-1 text-xs">
                              <Clock className="w-3.5 h-3.5 text-gray-400" /> {formatTime(v.time_spent)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deleteVisitor(v.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
