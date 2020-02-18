//
//  ContentView.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI

struct ContentView: View  {
    @State var persons : [Person] =  [
        Person(name:"nom",firstName:"prenom",department: "department", profession: "profession"),
        Person(name:"Menouer",firstName:"Michel",department: "IG4", profession: "student"),
        Person(name:"Mas",firstName:"Amjad",department: "IG4", profession: "student"),
        Person(name:"Ranarimahefa",firstName:"Rayan",department: "IG4", profession: "student"),
        Person(name:"Bahroun",firstName:"Lucas",department: "IG4", profession: "student"),
    ]
    var body: some View {
        NavigationView{
            VStack {
                List{
                    Section(header : Text("Ajout ")){
                        NavigationLink(destination : PersonForm(persons : $persons )){
                            Text("personne")
                            Image(systemName :  "plus.circle.fill")
                                .foregroundColor(.green)
                        }
                    }
                    Section(header : Text("Liste étudiants ")){
                        ForEach(0..<persons.count, id : \.self){ index in
                            NavigationLink(destination: PersonDetail(person: self.$persons[index])){
                                PersonRow( person: self.$persons[index])
                            }
                        }
                    }
                }.font(.headline)
            }
            .navigationBarTitle(Text("Liste Etudiants"))
            .navigationBarItems(trailing: EditButton())
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}


