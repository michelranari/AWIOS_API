//
//  ContentView.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI

struct ContentView: View  {
    @State var persons = [
        Person(name:"nom",firstName:"prenom",department: "department", profession: "profession"),
        Person(name:"Menouer",firstName:"Michel",department: "IG4", profession: "student"),
        Person(name:"Mas",firstName:"Amjad",department: "IG4", profession: "student"),
        Person(name:"Ranarimahefa",firstName:"Rayan",department: "IG4", profession: "student"),
        Person(name:"Bahroun",firstName:"Lucas",department: "IG4", profession: "student"),
    ]
    
    var body: some View {
        NavigationView{
            VStack {
                NavigationLink(destination : PersonForm(persons: $persons)){
                    Text("Ajouter personne")
                }
                List{
                    ForEach(0..<persons.count, id : \.self){ index in
                        NavigationLink(destination: PersonDetail(person: self.$persons[index])){
                            PersonRow( person: self.$persons[index])
                        }
                    }
                }
                Button(action: {
                    let encoder = JSONEncoder()
                    let decoder = JSONDecoder()
                    let fm = FileManager.default
                    
                    // Create an url for "Documents" directory in user home "~"
                    let path = fm.urls(for: .documentDirectory, in: .userDomainMask).first
                    
                    // Append file name to the URL
                    let path2 = path?.appendingPathComponent("json.json")
                    
                    // Encode to json
                    let jsonPerson = try? encoder.encode(self.persons[0])
                    do {
                        // Write file
                        try jsonPerson?.write(to: path2!)
                        
                        // Read file
                            // Get file URL
                        let fileURL: URL? = try fm.contentsOfDirectory(at: path!,includingPropertiesForKeys: nil)[0]
                        if let fileURL = fileURL {
                            // Read file content in String object
                            let jsonRead : String? = try String(contentsOf: fileURL, encoding: .utf8)
                            // Print String object
                            if let jsonRead = jsonRead {
                                print(jsonRead)
                            }
                        }
                    } catch let e as Error { print("\(e.localizedDescription)") }
                    
                }) {
                    Text("Enregistrer JSON")
                }
            }            
        }
    }
}




struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}


