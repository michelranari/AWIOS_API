//
//  PersonDetail.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI


struct PersonDetail: View {
    @Binding var person : Person
    var body: some View {
        List{
            Text("Détails").bold().font(.title)
            Text(person.name)
            Text(person.firstName)
            Text(person.department)
            Text(person.profession)
        }
    }
}

struct PersonDetail_Previews: PreviewProvider {
    @State static var person = Person(name: "a", firstName: "b", department: "ig", profession: "student")
    static var previews: some View {
        PersonDetail(person : $person)
    }
}
