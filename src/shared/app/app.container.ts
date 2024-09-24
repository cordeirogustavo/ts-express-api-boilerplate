import { container } from "tsyringe";

import { OrderContainer } from "@/domain/order";
import { ProductContainer } from "@/domain/product";

import { ProvidersContainer } from "@/shared/providers/providers.container";
import { ServicesContainer } from "@/shared/services";
import { UserContainer } from "@/domain/user";

ProvidersContainer.register(container);
ServicesContainer.register(container);

OrderContainer.register(container);
ProductContainer.register(container);
UserContainer.register(container);
