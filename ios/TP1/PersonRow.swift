//
//  SwiftUIView.swift
//  TP1
//
//  Created by user164568 on 2/11/20.
//  Copyright © 2020 user164568. All rights reserved.
//

import SwiftUI

struct PersonRow: View{
    @Binding var person : Person
    var body: some View {
        HStack{
            Text(person.name)
            Text(person.firstName)
            Spacer()
            Text(person.profession)
            Text(person.department)
        }.padding()
    }
}

struct PersonRow_Previews: PreviewProvider {
    @State static var p = Person(name: "a", firstName: "b", department: "ig", profession: "student")
    static var previews: some View {
        PersonRow(person : $p)
    }
}
