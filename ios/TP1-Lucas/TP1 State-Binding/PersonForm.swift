//
//  PersonForm.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI

struct PersonForm: View {
    @Binding var persons : [Person]
    @State var name : String = ""
    @State var firstName : String = ""
    @State var dpt : String = ""
    @State var profession : String = ""
    
    var body: some View {
        Form {
            Section(header: Text("Enter your informations")){
                TextField("Name", text : $name)
                TextField("First Name",text : $firstName)
                TextField("Department",text: $dpt)
                TextField("Profession",text: $profession)
            }
            Section {
                Button(action: {
                    self.persons.append(Person(name : self.name, firstName : self.firstName, department : self.dpt, profession: self.profession))
                }) {
                    Text("Ajouter")
                }
            }
        }
    }
}

struct PersonForm_Previews: PreviewProvider {
    @State static var persons = [Person(name: "a", firstName: "b", department: "ig", profession: "student")]
    static var previews: some View {
        PersonForm(persons : self.$persons)
    }
}
