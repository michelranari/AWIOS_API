//
//  ContentView.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI

struct ContentView: View  {
    @State var persons = Persons(persons: [
        Person(name:"nom",firstName:"prenom",department: "department", profession: "profession"),
        Person(name:"Menouer",firstName:"Michel",department: "IG4", profession: "student"),
        Person(name:"Mas",firstName:"Amjad",department: "IG4", profession: "student"),
        Person(name:"Ranarimahefa",firstName:"Rayan",department: "IG4", profession: "student"),
        Person(name:"Bahroun",firstName:"Lucas",department: "IG4", profession: "student"),
    ])
    var body: some View {
            NavigationView{
                VStack {
                    NavigationLink(destination : PersonForm(persons: persons)){
                        Text("Ajouter personne")
                    }
                    List{
                        ForEach(0..<persons.count, id : \.self){ index in
                            NavigationLink(destination: PersonDetail(person: persons[index])){
                                PersonRow( person: persons[index])
                            }
                        }
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


